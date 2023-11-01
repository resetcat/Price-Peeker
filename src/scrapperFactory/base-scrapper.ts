import { ProductDto, RawProductDto } from 'src/dto/products.dto';
import { StoreScraper } from './store-scrapper.interface';

export abstract class BaseScraper implements StoreScraper {
  abstract scrapeProducts(
    query: string,
    page: number,
  ): Promise<RawProductDto[]>;

  sanitizeProducts(products: RawProductDto[]): void {
    products.forEach((product: any) => {
      if (!product.originalPrice && product.discountedPrice) {
        product.originalPrice = this.formatPrice(product.discountedPrice);
        delete product.discountedPrice;
      } else if (product.originalPrice && product.discountedPrice) {
        this.addDiscount(product);
      }
    });
  }

  formatPrice(price: string): number {
    const numberPrice = parseFloat(price.replace('€', '').replace(',', '.'));
    return Number(numberPrice.toFixed(2));
  }

  addDiscount(product: any): void {
    product.originalPrice = this.formatPrice(product.originalPrice);

    if (product.discountedPrice) {
      product.discountedPrice = this.formatPrice(product.discountedPrice);
      const discountPercentage = Math.round(
        (1 - product.discountedPrice / product.originalPrice) * 100,
      );
      product.discount = `${discountPercentage}%`;
    }
  }
}
