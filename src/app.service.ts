import { Injectable, Logger } from '@nestjs/common';
import { SearchDto } from './dto/search.dto';
import { StoreScraperFactory } from './scrapperFactory/scrapper-factory';
import { ProductDto } from './dto/products.dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger('AppService');
  getHello(): string {
    return 'Hello World!';
  }

  async getGrocery(searchDto: SearchDto): Promise<ProductDto[]> {
    const { shops = ['R-Gshop', 'M-Gshop'], query, page = 1 } = searchDto;
    const results = await Promise.allSettled(
      shops.map((shop) => this.scrapeShop(shop, query, page)),
    );

    return this.processResults(results);
  }

  private async scrapeShop(
    shop: string,
    query: string,
    page: number,
  ): Promise<ProductDto[] | undefined> {
    const scraper = StoreScraperFactory.createScraper(shop);
    try {
      return await scraper.scrapeProducts(query, page);
    } catch (error) {
      this.logger.error(`Error scraping data from ${shop}: ${error.message}`);
      return undefined;
    }
  }

  processResults(results: PromiseSettledResult<ProductDto[]>[]): ProductDto[] {
    const allProducts = this.getFulfilledProductDtos(results);
    const productsByShopId = this.groupProductsByShopId(allProducts);
    const sortedProducts = this.interleaveProducts(productsByShopId);
    return sortedProducts;
  }

  private getFulfilledProductDtos(
    results: PromiseSettledResult<ProductDto[]>[],
  ): ProductDto[] {
    return results
      .filter(
        (result): result is PromiseFulfilledResult<ProductDto[]> =>
          result.status === 'fulfilled',
      )
      .flatMap((result) => result.value);
  }

  private groupProductsByShopId(products: ProductDto[]): ProductDto[][] {
    const productsByShopId: ProductDto[][] = [];
    products.forEach((product) => {
      const shopIndex = product.id - 1; // id is 1-indexed.
      productsByShopId[shopIndex] = productsByShopId[shopIndex] || [];
      productsByShopId[shopIndex].push(product);
    });
    return productsByShopId;
  }

  private interleaveProducts(groups: ProductDto[][]): ProductDto[] {
    const interleavedProducts: ProductDto[] = [];
    const maxProducts = Math.max(...groups.map((products) => products.length));

    for (let i = 0; i < maxProducts; i++) {
      groups.forEach((group) => {
        if (group && i < group.length) {
          interleavedProducts.push(group[i]);
        }
      });
    }

    return interleavedProducts;
  }
}
