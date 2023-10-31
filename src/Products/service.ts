import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { ProductsInputInterface, ProductsInterface } from './model';

interface Update {
  id?: number;
  updateProducts: ProductsInputInterface;
}

export class ProductsService {
  private repository: Prisma.ProdutosDelegate<DefaultArgs>;
  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.produtos;
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

  update = async ({ id, updateProducts }: Update) => {
    return await this.repository.update({
      where: { id },
      data: {
        ...updateProducts,
      },
    });
  };

  create = async (products: ProductsInterface) => {
    return await this.repository.create({
      data: products,
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
