import { Product } from "@prisma/client"
import { ProductRepository } from "../../repositories/product/product-repository"

type ListProductRequest = {
  query?: string  
}

type ListProductResponse = Product[]

class ListProduct {
  constructor(
    private productRepository: ProductRepository
  ) {}

  async execute(request: ListProductRequest): Promise<ListProductResponse> {
    const { query } = request
    
    const products = await this.productRepository.list(query)

    return products
  }
}

export { ListProduct }
