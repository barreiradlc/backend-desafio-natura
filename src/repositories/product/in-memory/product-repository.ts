import { Prisma, Product } from "@prisma/client";
import { randomUUID } from "crypto";
import { ListProductParams, ProductRepository } from "../product-repository";

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

  async list({ query = '', take }: ListProductParams): Promise<Product[]> {
    const products = this.products
      .filter((product) => {
        return product.name.includes(query) || product.description.includes(query)
      })
      .slice(0, take || this.products.length + 1)

    return products
  }
  

}

export { InMemoryProductRepository };
