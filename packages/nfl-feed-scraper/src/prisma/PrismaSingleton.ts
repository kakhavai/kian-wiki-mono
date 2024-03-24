import { PrismaClient } from '@prisma/client';

class PrismaSingleton extends PrismaClient {
  private static _instance: PrismaSingleton;

  private constructor() {
    super();
  }

  public static getInstance(): PrismaSingleton {
    if (!PrismaSingleton._instance) {
      PrismaSingleton._instance = new PrismaSingleton();
      // Do not explicitly call $connect() here; let Prisma handle connection lazily.
    }
    return PrismaSingleton._instance;
  }
}

export default PrismaSingleton;
