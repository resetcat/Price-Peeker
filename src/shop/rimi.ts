import { Logger } from '@nestjs/common';
import puppeteer, { Browser } from 'puppeteer';
import { RawProductDto } from 'src/dto/products.dto';
import { BaseScraper } from 'src/scrapperFactory/base-scrapper';

export class Rimi extends BaseScraper {
  private readonly logger = new Logger('Rimi');

  async scrapeProducts(query: string, page: number): Promise<RawProductDto[]> {
    let browser: Browser;
    try {
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Recommended args for running in Docker
      });
      const webPage = await browser.newPage();
      const url = `https://www.rimi.lv/e-veikals/lv/meklesana?page=${page}&pageSize=52&query=${query}%3Arelevance%3AassortmentStatus%3AinAssortment`;
      this.logger.log('Scrapping from ' + url);
      await webPage.goto(url);

      const products = await webPage.$$eval(
        '.product-grid__item',
        (items): RawProductDto[] => {
          return items.map((item): RawProductDto => {
            const name =
              (
                item.querySelector('.card__name') as HTMLElement
              )?.textContent?.trim() || '';
            const imgElement = item.querySelector(
              '.card__image-wrapper img',
            ) as HTMLImageElement;
            const imgURL = imgElement?.src || '';

            let originalPrice = null;
            let discountedPrice = null;

            if (item.querySelector('.old-price-tag.card__old-price')) {
              originalPrice =
                (
                  item.querySelector(
                    '.old-price-tag.card__old-price span',
                  ) as HTMLElement
                )?.textContent?.replace(/\s+/g, '') || '';
              originalPrice = originalPrice
                .replace(/(\d)(\d{2}€)/, '$1.$2')
                .replace('/gab.', '');

              discountedPrice =
                (
                  item.querySelector('.price-tag.card__price') as HTMLElement
                )?.textContent
                  ?.replace(/\s+/g, '')
                  .replace(/(\d)(\d{2}€)/, '$1.$2') || null;
              discountedPrice = discountedPrice.replace('/gab.', '');
            } else if (item.querySelector('.price-badge__body')) {
              // For cases when the discount is for cardholders
              discountedPrice = Array.from(
                item.querySelectorAll(
                  '.price-badge__body .price-badge__price span',
                ),
              )
                .map((el) => el.textContent)
                .join('.')
                .concat('€');

              originalPrice =
                (
                  item.querySelector('.price-tag.card__price') as HTMLElement
                )?.textContent?.replace(/\s+/g, '') || '';
              originalPrice = originalPrice
                .replace(/(\d)(\d{2}€)/, '$1.$2')
                .replace('/gab.', '');
            } else {
              originalPrice =
                (
                  item.querySelector('.price-tag.card__price') as HTMLElement
                )?.textContent?.replace(/\s+/g, '') || '';
              originalPrice = originalPrice
                .replace(/(\d)(\d{2}€)/, '$1.$2')
                .replace('/gab.', '');
            }

            // Remove any extra characters from the prices
            discountedPrice = discountedPrice?.replace('.€€', '€');

            let pricePerUnit =
              (item.querySelector('.card__price-per') as HTMLElement)
                ?.textContent || '';
            pricePerUnit = pricePerUnit
              .replace(/\s+/g, '')
              .trim()
              .replace(',', '.');

            const cardOwnerOnly = !!item.querySelector('div.price-badge__body');

            return {
              id: 1,
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

      products.map((item) => this.addDiscount(item));

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
