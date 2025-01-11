import { Test } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getModelToken } from '@nestjs/mongoose';
import { ProductsService } from 'src/products/products.service';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';

describe('OrdersService', () => {
  let orderService: OrdersService;
  let productsModel: Model<Product>;
  //   let ordersModel: Model<Order>;

  const cart = [
    {
      _id: '678057bef3eb387d09edd51b',
      name: 'Macaron Mix of Five',
      price: 8,
      image: {
        thumbnail: './assets/images/image-macaron-thumbnail.jpg',
        mobile: './assets/images/image-macaron-mobile.jpg',
        tablet: './assets/images/image-macaron-tablet.jpg',
        desktop: './assets/images/image-macaron-desktop.jpg',
      },
      category: 'Macaron',
      ingredients: [
        'Almond Flour',
        'Egg Whites',
        'Powdered Sugar',
        'Food Coloring',
        'Buttercream Filling',
      ],
      calories: 450,
      popularity: 7,
      quantity: 2,
    },
  ];
  const expectedOrder = {
    userId: 'userTest',
    status: 'placed',
    total: 16,
    items: [
      {
        name: 'Macaron Mix of Five',
        price: 8,
        quantity: 2,
      },
    ],
    _id: '6782c792bc388d418e62c9af',
    orderId: '6782c792',
    createdAt: '2025-01-11T19:33:38.283Z',
    updatedAt: '2025-01-11T19:33:38.283Z',
    __v: 0,
  };

  const productInDb = {
    _id: '678057bef3eb387d09edd51b',
    name: 'Macaron Mix of Five',
    price: 8,
    image: {
      thumbnail: './assets/images/image-macaron-thumbnail.jpg',
      mobile: './assets/images/image-macaron-mobile.jpg',
      tablet: './assets/images/image-macaron-tablet.jpg',
      desktop: './assets/images/image-macaron-desktop.jpg',
    },
    category: 'Macaron',
    ingredients: [
      'Almond Flour',
      'Egg Whites',
      'Powdered Sugar',
      'Food Coloring',
      'Buttercream Filling',
    ],
    calories: 450,
    popularity: 7,
  };
  const mockProductsModel = {
    findById: jest.fn(),
  };
  const mockOrdersModel = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: getModelToken(Order.name), useValue: mockOrdersModel },
        ProductsService,
        { provide: getModelToken(Product.name), useValue: mockProductsModel },
      ],
    }).compile();

    orderService = module.get<OrdersService>(OrdersService);
    productsModel = module.get<Model<Product>>(getModelToken(Product.name));
    // ordersModel = module.get(getModelToken(Order.name));
  });
});
