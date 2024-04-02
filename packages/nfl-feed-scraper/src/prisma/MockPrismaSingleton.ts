jest.mock('./PrismaSingleton', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

import { PrismaClient } from '@prisma/client';

import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import prisma from './PrismaSingleton';

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock: DeepMockProxy<PrismaClient> =
  prisma as unknown as DeepMockProxy<PrismaClient>;
