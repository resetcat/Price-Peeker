import { Rimi } from 'src/shop/rimi';
import { Maxima } from 'src/shop/maxima';
import { StoreScraper } from './store-scrapper.interface';

export class StoreScraperFactory {
  static createScraper(storeName: string): StoreScraper {
    switch (storeName) {
      case 'R-Gshop':
        return new Rimi();
      case 'M-Gshop':
        return new Maxima();
      // ... add more cases as new stores are added
      default:
        throw new Error(`Scraper for store ${storeName} not found.`);
    }
  }
}
