import { Test } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let model: Model<Product>;

  const mockProduct = {
    _id: '67808ab4e0caf3062ba0e8fe',
    title: 'Product 1',
    description: 'Description 1',
    price: 100,
    image: {
      thumbnail: 'Thumbnail 1',
      mobile: 'Mobile 1',
      tablet: 'Tablet 1',
    },
    category: 'Category 1',
    ingredients: ['Ingredient 1', 'Ingredient 2'],
    popularity: 5,
    calories: 300,
  };

  const mockProductService = {
    find: jest.fn(),
    findOneAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductService,
        },
      ],
    }).compile();

    productsService = moduleRef.get(ProductsService);
    model = moduleRef.get<Model<Product>>(getModelToken(Product.name));
  });

  it('should be defined', async () => {
    expect(productsService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            lean: () => ({
              select: jest.fn().mockResolvedValue([mockProduct]),
            }),
          }) as any,
      );

      const result = await productsService.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(result).toEqual([mockProduct]);
    });
  });

  describe('deleteOne', () => {
    it('should delete a product', async () => {
      jest
        .spyOn(model, 'findOneAndDelete')
        .mockResolvedValue({ message: 'Product deleted successfully' });

      const result = await productsService.deleteOne(mockProduct._id);

      expect(model.findOneAndDelete).toHaveBeenCalledWith({
        _id: mockProduct._id,
      });
      expect(result).toBeInstanceOf(Object);
      expect(result).toEqual({ message: 'Product deleted successfully' });
    });

    it('should throw an error if product is not found', async () => {
      jest.spyOn(model, 'findOneAndDelete').mockResolvedValue(null);

      await expect(
        productsService.deleteOne('677f0d74a34044829f32a94d'),
      ).rejects.toThrow(NotFoundException);

      await expect(
        productsService.deleteOne('677f0d74a34044829f32a94d'),
      ).rejects.toMatchObject({
        response: {
          message: 'Product with ID 677f0d74a34044829f32a94d not found',
          error: 'Not Found',
          statusCode: 404,
        },
      });
    });
  });
});
