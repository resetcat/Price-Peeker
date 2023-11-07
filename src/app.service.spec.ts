import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { ProductDto } from './dto/products.dto';

describe('AppService', () => {
  let service: AppService;
  const shop1Products = [
    {
      id: 1,

      originalPrice: 3.19,
    },
    {
      id: 1,

      originalPrice: 3.39,
    },
    {
      id: 1,

      originalPrice: 3.39,
    },
    {
      id: 1,

      originalPrice: 2.79,
    },
    {
      id: 1,

      originalPrice: 2.85,
    },
    {
      id: 1,

      originalPrice: 5.49,
    },
    {
      id: 1,

      originalPrice: 2.99,
    },
    {
      id: 1,

      originalPrice: 8.99,
    },
    {
      id: 1,

      originalPrice: 2.59,
    },
    {
      id: 1,

      originalPrice: 2.79,
    },
    {
      id: 1,

      originalPrice: 11.99,
    },
    {
      id: 1,

      originalPrice: 6.99,
    },
    {
      id: 1,

      originalPrice: 2.65,
    },
    {
      id: 1,

      originalPrice: 6.99,
    },
    {
      id: 1,

      originalPrice: 16.99,
    },
    {
      id: 1,

      originalPrice: 7.99,
    },
    {
      id: 1,

      originalPrice: 5.79,
    },
    {
      id: 1,

      originalPrice: 12.9,
    },
    {
      id: 1,

      originalPrice: 14.99,
    },
    {
      id: 1,

      originalPrice: 8.99,
    },
    {
      id: 1,

      originalPrice: 5.99,
    },
    {
      id: 1,

      originalPrice: 8.99,
    },
    {
      id: 1,

      originalPrice: 1.89,
    },
    {
      id: 1,

      originalPrice: 0.95,
    },
    {
      id: 1,

      originalPrice: 1.69,
    },
    {
      id: 1,

      originalPrice: 5.44,
    },
    {
      id: 1,

      originalPrice: 2.99,
    },
    {
      id: 1,

      originalPrice: 8.29,
    },
    {
      id: 1,

      originalPrice: 1.89,
    },
    {
      id: 1,

      originalPrice: 2.99,
    },
    {
      id: 1,

      originalPrice: 8.49,
    },
    {
      id: 1,

      originalPrice: 11.49,
    },
    {
      id: 1,

      originalPrice: 2.69,
    },
    {
      id: 1,

      originalPrice: 5.49,
    },
    {
      id: 1,

      originalPrice: 2.75,
    },
    {
      id: 1,

      originalPrice: 4.59,
    },
    {
      id: 1,

      originalPrice: 3.99,
    },
    {
      id: 1,

      originalPrice: 3.69,
    },
    {
      id: 1,

      originalPrice: 7.79,
    },
    {
      id: 1,

      originalPrice: 8.99,
    },
    {
      id: 1,

      originalPrice: 1.85,
    },
    {
      id: 1,

      originalPrice: 6.49,
    },
    {
      id: 1,

      originalPrice: 6.49,
    },
    {
      id: 1,
      originalPrice: 13.99,
    },
    {
      id: 1,
      originalPrice: 6.49,
    },
    {
      id: 1,

      originalPrice: 5.99,
    },
    {
      id: 1,

      originalPrice: 7.39,
    },
    {
      id: 1,

      originalPrice: 3.69,
    },
    {
      id: 1,

      originalPrice: 4.79,
    },
    {
      id: 1,

      originalPrice: 8.49,
    },
    {
      id: 1,

      originalPrice: 13.99,
    },
    {
      id: 1,

      originalPrice: 3.49,
    },
  ];
  const shop2Products = [
    {
      id: 2,
      originalPrice: 3.49,
    },
    {
      id: 2,
      originalPrice: 8.49,
    },
    {
      id: 2,
      originalPrice: 13.99,
    },
    {
      id: 2,
      originalPrice: 9.99,
    },
    {
      id: 2,
      originalPrice: 9.99,
    },
    {
      id: 2,
      originalPrice: 3.22,
    },
    {
      id: 2,
      originalPrice: 1.42,
    },
    {
      id: 2,
      originalPrice: 2.69,
    },
    {
      id: 2,
      originalPrice: 0.99,
    },
    {
      id: 2,
      originalPrice: 2.19,
    },
    {
      id: 2,
      originalPrice: 2.49,
    },
    {
      id: 2,
      originalPrice: 2.29,
    },
    {
      id: 2,
      originalPrice: 3.69,
    },
    {
      id: 2,
      originalPrice: 0.79,
    },
    {
      id: 2,
      originalPrice: 7.99,
    },
    {
      id: 2,
      originalPrice: 6.79,
    },
    {
      id: 2,
      originalPrice: 2.69,
    },
    {
      id: 2,
      originalPrice: 2.99,
    },
    {
      id: 2,
      originalPrice: 3.49,
    },
    {
      id: 2,
      originalPrice: 4.89,
    },
    {
      id: 2,
      originalPrice: 0.93,
    },
    {
      id: 2,
      originalPrice: 2.59,
    },
    {
      id: 2,
      originalPrice: 4.99,
    },
    {
      id: 2,
      originalPrice: 2.99,
    },
    {
      id: 2,
      originalPrice: 3.22,
    },
    {
      id: 2,
      originalPrice: 0.78,
    },
    {
      id: 2,
      originalPrice: 1.97,
    },
    {
      id: 2,
      originalPrice: 2.09,
    },
    {
      id: 2,
      originalPrice: 10.99,
    },
    {
      id: 2,
      originalPrice: 2.19,
    },
    {
      id: 2,
      originalPrice: 1.79,
    },
    {
      id: 2,
      originalPrice: 4.29,
    },
    {
      id: 2,
      originalPrice: 9.69,
    },
    {
      id: 2,
      originalPrice: 2.19,
    },
    {
      id: 2,
      originalPrice: 6.29,
    },
    {
      id: 2,
      originalPrice: 4.99,
    },
    {
      id: 2,
      originalPrice: 3.36,
    },
    {
      id: 2,
      originalPrice: 2.49,
    },
    {
      id: 2,
      originalPrice: 3.79,
    },
    {
      id: 2,
      originalPrice: 4.49,
    },
    {
      id: 2,
      originalPrice: 3.49,
    },
    {
      id: 2,
      originalPrice: 2.89,
    },
    {
      id: 2,
      originalPrice: 2.96,
    },
    {
      id: 2,
      originalPrice: 2.99,
    },
    {
      id: 2,
      originalPrice: 2.39,
    },
    {
      id: 2,
      originalPrice: 1.63,
    },
    {
      id: 2,
      originalPrice: 1.79,
    },
    {
      id: 2,
      originalPrice: 2.69,
    },
    {
      id: 2,
      originalPrice: 3.32,
    },
    {
      id: 2,
      originalPrice: 2.69,
    },
    {
      id: 2,
      originalPrice: 3.62,
    },
    {
      id: 2,
      originalPrice: 6.29,
    },
  ];
  const shop3Products = [
    {
      id: 3,
      originalPrice: 3.49,
    },
    {
      id: 3,
      originalPrice: 8.49,
    },
    {
      id: 3,
      originalPrice: 13.99,
    },
    {
      id: 3,
      originalPrice: 9.99,
    },
    {
      id: 3,
      originalPrice: 9.99,
    },
    {
      id: 3,
      originalPrice: 3.3,
    },
    {
      id: 3,
      originalPrice: 1.43,
    },
    {
      id: 3,
      originalPrice: 3.69,
    },
    {
      id: 3,
      originalPrice: 0.99,
    },
    {
      id: 3,
      originalPrice: 3.19,
    },
    {
      id: 3,
      originalPrice: 3.49,
    },
    {
      id: 3,
      originalPrice: 3.39,
    },
    {
      id: 3,
      originalPrice: 3.69,
    },
    {
      id: 3,
      originalPrice: 0.79,
    },
    {
      id: 3,
      originalPrice: 7.99,
    },
    {
      id: 3,
      originalPrice: 6.79,
    },
    {
      id: 3,
      originalPrice: 3.69,
    },
    {
      id: 3,
      originalPrice: 3.99,
    },
    {
      id: 3,
      originalPrice: 3.49,
    },
    {
      id: 3,
      originalPrice: 4.89,
    },
    {
      id: 3,
      originalPrice: 0.93,
    },
    {
      id: 3,
      originalPrice: 3.59,
    },
    {
      id: 3,
      originalPrice: 4.99,
    },
    {
      id: 3,
      originalPrice: 3.99,
    },
    {
      id: 3,
      originalPrice: 3.3,
    },
    {
      id: 3,
      originalPrice: 0.78,
    },
    {
      id: 3,
      originalPrice: 1.97,
    },
    {
      id: 3,
      originalPrice: 3.09,
    },
    {
      id: 3,
      originalPrice: 10.99,
    },
    {
      id: 3,
      originalPrice: 3.19,
    },
    {
      id: 3,
      originalPrice: 1.79,
    },
    {
      id: 3,
      originalPrice: 4.39,
    },
    {
      id: 3,
      originalPrice: 9.69,
    },
    {
      id: 3,
      originalPrice: 3.19,
    },
    {
      id: 3,
      originalPrice: 6.39,
    },
    {
      id: 3,
      originalPrice: 4.99,
    },
    {
      id: 3,
      originalPrice: 3.36,
    },
    {
      id: 3,
      originalPrice: 3.49,
    },
    {
      id: 3,
      originalPrice: 3.79,
    },
    {
      id: 3,
      originalPrice: 4.49,
    },
    {
      id: 3,
      originalPrice: 3.49,
    },
    {
      id: 3,
      originalPrice: 3.89,
    },
    {
      id: 3,
      originalPrice: 3.96,
    },
    {
      id: 3,
      originalPrice: 3.99,
    },
    {
      id: 3,
      originalPrice: 3.39,
    },
    {
      id: 3,
      originalPrice: 1.63,
    },
    {
      id: 3,
      originalPrice: 1.79,
    },
    {
      id: 3,
      originalPrice: 3.69,
    },
    {
      id: 3,
      originalPrice: 3.33,
    },
    {
      id: 3,
      originalPrice: 3.69,
    },
    {
      id: 3,
      originalPrice: 3.63,
    },
    {
      id: 3,
      originalPrice: 6.29,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should filter fulfilled promises and sort products by originalPrice', () => {
    // Arrange
    const mockResults: PromiseSettledResult<ProductDto[]>[] = [
      {
        status: 'fulfilled',
        value: shop1Products as ProductDto[],
      },
      { status: 'rejected', reason: 'Error' },
      {
        status: 'fulfilled',
        value: shop2Products as ProductDto[],
      },
      {
        status: 'fulfilled',
        value: shop3Products as ProductDto[],
      },
    ];

    // Act
    const sortedProducts = service.processResults(mockResults);

    // Assert
    expect(sortedProducts.length).toBe(156);
    expect(sortedProducts[0].id).toBe(1);
    expect(sortedProducts[1].id).toBe(2);
    expect(sortedProducts[2].id).toBe(3);
    expect(sortedProducts[3].id).toBe(1);
    expect(sortedProducts[4].id).toBe(2);
    expect(sortedProducts[5].id).toBe(3);
  });
});
