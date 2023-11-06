import { Rimi } from 'src/shop/rimi';
import { Maxima } from 'src/shop/maxima';
import { StoreScraper } from './store-scrapper.interface';
import { Logger } from '@nestjs/common';

export class StoreScraperFactory {
  private static readonly logger = new Logger(StoreScraperFactory.name);

  static createScraper(storeName: string): StoreScraper {
    switch (storeName) {
      case 'R-Gshop':
        return new Rimi();
      case 'M-Gshop':
        return new Maxima();
      // ... add more cases as new stores are added
      default:
        this.logger.error(`Unknown store name: ${storeName}`);
        throw new Error(`Scraper for store ${storeName} not found.`);
    }
  }
}
