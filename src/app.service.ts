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
      shops.map(async (shop: string) => {
        const scraper = StoreScraperFactory.createScraper(shop);
        try {
          return await scraper.scrapeProducts(query, page);
        } catch (error) {
          this.logger.error(
            `Error scraping data from ${shop}: ${error.message}`,
          );
          return undefined;
        }
      }),
    );

    const successfulResults = results
      .filter(
        (result): result is PromiseFulfilledResult<ProductDto[]> =>
          result.status === 'fulfilled',
      )
      .map((result) => result.value)
      .flat()
      .sort((a, b) => a.originalPrice - b.originalPrice);

    // Return the successful results
    return successfulResults;
  }
}
