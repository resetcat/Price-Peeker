export class ProductDto {
  id: number;
  name: string;
  imgURL: string;
  discount?: string;
  originalPrice: number;
  discountedPrice?: number;
  pricePerUnit: string;
  cardOwnerOnly?: boolean;
}

export class RawProductDto {
  id: number;
  name: string;
  imgURL: string;
  discount?: string;
  originalPrice: string;
  discountedPrice?: string;
  pricePerUnit: string;
  cardOwnerOnly?: boolean;
}
