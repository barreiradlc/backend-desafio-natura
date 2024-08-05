import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { ProductRepository } from "../product-repository";

class PrismaProductRepository implements ProductRepository {
  async create({ name, description }: Prisma.ProductCreateInput) {
    const product = await prisma.product.create({ data: { name, description } })    

    return product
  }

}

export { PrismaProductRepository };
