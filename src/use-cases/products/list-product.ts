import { Product } from "@prisma/client"
import { ProductRepository } from "../../repositories/product/product-repository"

type ListProductRequest = {
  query?: string  
  take?: number  
  skip?: number  
}

type ListProductResponse = Product[]

class ListProduct {
  constructor(
    private productRepository: ProductRepository
  ) {}

  async execute(request: ListProductRequest): Promise<ListProductResponse> {
    const { query, take, skip } = request
    
    const products = await this.productRepository.list({
      query,
      take,
      skip  
    })

    return products
  }
}

export { ListProduct }
