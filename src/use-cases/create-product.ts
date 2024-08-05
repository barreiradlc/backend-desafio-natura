import { Product } from "@prisma/client"
import { ProductRepository } from "../repositories/product/product-repository"

type CreateProductRequest = {
  name: string
  description: string
}

type CreateProductResponse = Product

class CreateProduct {
  constructor(
    private productRepository: ProductRepository
  ) {}

  async execute(request: CreateProductRequest): Promise<CreateProductResponse> {
    const { name, description } = request
    
    const product = await this.productRepository.create({
      name, description
    })

    return product
  }
}

export { CreateProduct }
