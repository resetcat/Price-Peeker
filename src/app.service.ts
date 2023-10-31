import { Injectable } from '@nestjs/common';
import { SearchDto } from './dto/search.dto';
import { StoreScraperFactory } from './scrapperFactory/scrapper-factory';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getAll(searchDto: SearchDto) {
    const { shops = ['R-Gshop', 'M-Gshop'], query, page = 1 } = searchDto;

    const results = await Promise.all(
      shops.map((shop) => {
        const scraper = StoreScraperFactory.createScraper(shop);
        return scraper.scrapeProducts(query, page);
      }),
    );

    // Flatten the results array and sort
    return results.flat().sort((a, b) => a.originalPrice - b.originalPrice);
  }
}
