import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { CategoryInputInterface, CategoryInterface } from './model';

interface Update {
  id?: number;
  updateCategory: CategoryInputInterface;
}

export class CategoryService {
  private repository: Prisma.CategoryDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.category;
  }
  index = async () => {
    return await this.repository.findMany({
      orderBy: { id: 'asc' },
    });
  };

  show = async (id: number) => {
    return await this.repository.findUnique({
      where: {
        id,
      },
    });
  };

  update = async ({ id, updateCategory }: Update) => {
    return await this.repository.update({
      where: { id },
      data: {
        ...updateCategory,
      },
    });
  };

  create = async (category: CategoryInterface) => {
    return await this.repository.create({
      data: category,
    });
  };

  delete = async (id: number) => {
    return await this.repository.delete({
      where: {
        id,
      },
    });
  };
}
