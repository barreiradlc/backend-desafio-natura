import { Prisma, Product } from "@prisma/client";
import { randomUUID } from "crypto";
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

  async list(query: string): Promise<Product[]> {    
    const products = this.products.filter((product) => product.name.includes(query) || product.description.includes(query))
    
    return products
  }
  

}

export { InMemoryProductRepository };
