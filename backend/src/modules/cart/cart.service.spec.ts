import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { PrismaService } from '../../database/prisma.service';

describe('CartService - Tiered Bulk Discount Engine', () => {
  let service: CartService;
  let prisma: PrismaService;

  const mockDiscountTiers = [
    { id: '1', minQuantity: 1, maxQuantity: 4, discountPercent: 0.0 },
    { id: '2', minQuantity: 5, maxQuantity: 19, discountPercent: 10.0 },
    { id: '3', minQuantity: 20, maxQuantity: null, discountPercent: 20.0 },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: PrismaService,
          useValue: {
            discountTier: {
              findMany: jest.fn().mockResolvedValue(mockDiscountTiers),
            },
            cartItem: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should return 0% discount for 1 to 4 items (standard retail)', async () => {
    const discount = await service.calculateBulkDiscountPercent(3);
    expect(discount).toEqual(0.0);
  });

  it('should return 10% discount for 5 to 19 items (tier 2 bulk)', async () => {
    const discount = await service.calculateBulkDiscountPercent(10);
    expect(discount).toEqual(10.0);
  });

  it('should return 20% discount for 20+ items (institutional tier)', async () => {
    const discount = await service.calculateBulkDiscountPercent(25);
    expect(discount).toEqual(20.0);
  });
});
