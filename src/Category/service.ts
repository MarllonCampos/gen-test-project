import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export class CategoryService {
  private repository: Prisma.CategoryDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.category;
  }

  index = async () => {
    return await this.repository.findMany();
  };
}
