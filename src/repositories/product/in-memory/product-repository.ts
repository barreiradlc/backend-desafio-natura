import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { Product } from "../../../entitites/product";
import { ProductRepository } from "../product-repository";

class InMemoryProductRepository implements ProductRepository {
  public products: Product[] = [];
  
  async create({ name, description }: Prisma.ProductCreateInput) {
    const product = {
      id: randomUUID(),
      name,
      description
    }

    this.products.push(product)

    return product
  }

  

}

export { InMemoryProductRepository };
