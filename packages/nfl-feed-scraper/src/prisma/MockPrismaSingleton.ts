// Mock the prisma named export
jest.mock('./PrismaSingleton', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import { prisma } from './PrismaSingleton';

const prismaMock: DeepMockProxy<PrismaClient> =
  prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});

export { prismaMock };
