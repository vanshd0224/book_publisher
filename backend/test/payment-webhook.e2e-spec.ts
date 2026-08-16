import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { OrderStatus } from '@prisma/client';

describe('Payments Webhook & Idempotency (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/payments/webhook (POST) - should process payment webhook and be idempotent on duplicate events', async () => {
    const mockPayload = {
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: 'pay_test_e2e_123',
            order_id: 'order_rzp_e2e_123',
            amount: 350000,
            status: 'captured',
            receipt: 'mock-order-id',
          },
        },
      },
    };

    // First Webhook Call
    const res1 = await request(app.getHttpServer())
      .post('/api/v1/payments/webhook')
      .send(mockPayload)
      .expect(200);

    expect(res1.body.success).toBe(true);

    // Duplicate Replayed Webhook Call (Idempotency check)
    const res2 = await request(app.getHttpServer())
      .post('/api/v1/payments/webhook')
      .send(mockPayload)
      .expect(200);

    expect(res2.body.success).toBe(true);
    expect(res2.body.data?.idempotent).toBe(true);
  });
});
