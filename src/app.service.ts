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

  async getGrocery(searchDto: SearchDto) {
    const { shops = ['R-Gshop', 'M-Gshop'], query, page = 1 } = searchDto;

    const results: ProductDto[] = await Promise.all(
      shops.map((shop) => {
        const scraper = StoreScraperFactory.createScraper(shop);
        return scraper.scrapeProducts(query, page);
      }),
    );

    // Flatten the results array and sort
    return results.flat().sort((a, b) => a.originalPrice - b.originalPrice);
  }
}
