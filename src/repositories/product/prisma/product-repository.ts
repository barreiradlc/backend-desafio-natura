import { Prisma, Product } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { ProductRepository } from "../product-repository";

class PrismaProductRepository implements ProductRepository {
  async list(query: string): Promise<Product[]> {    
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              mode: 'insensitive',
              contains: query
            }
          },
          {
            description: {
              mode: 'insensitive',
              contains: query
            }
          }
        ]
      }
    })
    
    return products
  }

  async create({ name, description }: Prisma.ProductCreateInput) {
    const product = await prisma.product.create({ data: { name, description } })    

    return product
  }

}

export { PrismaProductRepository };
