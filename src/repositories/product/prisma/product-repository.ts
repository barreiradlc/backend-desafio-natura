import { Prisma, Product } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { ListProductParams, ProductRepository } from "../product-repository";

class PrismaProductRepository implements ProductRepository {
  async list({ query = '', take = 20, skip = 0 }: ListProductParams): Promise<Product[]> {
    const products = await prisma.product.findMany({
      skip,
      take,
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

  async create({ name, description, price = 50, rating = 0 }: Prisma.ProductCreateInput) {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        rating
      }
    })    

    return product
  }

}

export { PrismaProductRepository };
