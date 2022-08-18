import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { ProductsService } from './products.service';

class MockRepository {
  async find() {
    const categories: Category[] = [new Category()];
    return categories;
  }
}

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Category),
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should return categories', async () => {
    const categories = await service.findAllCategory();
    expect(categories.categories).toBeInstanceOf(Array);
  });
});
