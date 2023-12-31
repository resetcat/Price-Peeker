import { Logger } from '@nestjs/common';
import puppeteer, { Browser } from 'puppeteer';
import { RawProductDto } from 'src/dto/products.dto';
import { BaseScraper } from 'src/scrapperFactory/base-scrapper';

export class Maxima extends BaseScraper {
  private readonly logger = new Logger('Maxima');

  async scrapeProducts(query: string, page: number): Promise<RawProductDto[]> {
    let browser: Browser;
    try {
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Recommended args for running in Docker
      });
      const webPage = await browser.newPage();
      const url = `https://barbora.lv/meklet?q=${query}&page=${page}`;
      this.logger.log('Scrapping from ' + url);
      await webPage.goto(url);

      const products = await webPage.$$eval(
        '.tw-flex-shrink-0.tw-list-none.tw-w-full',
        (items): RawProductDto[] => {
          return items.map((item): RawProductDto => {
            const name =
              (
                item.querySelector(
                  'a.tw-break-words.tw-text-b-paragraph-sm',
                ) as HTMLElement
              )?.textContent?.trim() || '';

            const imgElement = item.querySelector('img') as HTMLImageElement;
            const imgURL = imgElement?.src || '';
            const originalPriceElement = item.querySelector(
              '.tw-pl-2.tw-text-b-paragraph-xs.tw-font-bold.tw-text-gray-400.lg\\:tw-text-b-paragraph-sm',
            );
            const originalPrice =
              originalPriceElement?.textContent?.trim().replace(',', '.') || '';

            const discountPricePart1 =
              (
                item.querySelector(
                  '.tw-mr-0\\.5.tw-text-b-price-sm.tw-font-semibold.lg\\:tw-text-b-price-xl',
                ) as HTMLElement
              )?.textContent?.trim() || '0';

            const discountPricePart2 =
              (
                item.querySelector(
                  '.tw-text-b-price-xs.tw-font-semibold.lg\\:tw-text-b-price-lg',
                ) as HTMLElement
              )?.textContent?.trim() || '00';

            const discountedPrice =
              discountPricePart1 + '.' + discountPricePart2 + '€';

            const pricePerUnitElement = item.querySelector(
              '.tw-flex.tw-flex-row.tw-justify-between > span',
            );
            const pricePerUnit =
              pricePerUnitElement?.textContent?.replace(',', '.') || '';
            const cardOwnerOnly = !!item.querySelector(
              'span.tw-mr-1.tw-text-b-price-3xs.tw-font-semibold',
            );
            return {
              id: 2,
              name,
              imgURL,
              originalPrice,
              discountedPrice,
              pricePerUnit,
              cardOwnerOnly,
            };
          });
        },
      );

      await browser.close();
      this.sanitizeProducts(products);
      return products;
    } catch (error) {
      this.logger.error('An error occurred during scraping', error);
      throw new Error(
        'Scraping failed. Please check the logs for more details.',
      );
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
