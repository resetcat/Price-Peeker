import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { ProductDto } from './dto/products.dto';

describe('AppService', () => {
  let service: AppService;

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
        value: [{ name: 'Product 1', originalPrice: 10 }] as ProductDto[],
      },
      { status: 'rejected', reason: 'Error' },
      {
        status: 'fulfilled',
        value: [{ name: 'Product 2', originalPrice: 20 }] as ProductDto[],
      },
    ];
    const shopCount = 2;

    // Act
    const sortedProducts = service.processResults(mockResults, shopCount);

    // Assert
    expect(sortedProducts.length).toBe(2);
    expect(sortedProducts[0].name).toBe('Product 1');
    expect(sortedProducts[0].originalPrice).toBe(10);
    expect(sortedProducts[1].name).toBe('Product 2');
    expect(sortedProducts[1].originalPrice).toBe(20);
  });
});
