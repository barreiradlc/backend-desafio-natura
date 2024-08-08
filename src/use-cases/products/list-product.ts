import { Product } from "@prisma/client"
import { ProductRepository } from "../../repositories/product/product-repository"

type ListProductRequest = {
  query?: string  
  take?: string  
  skip?: string  
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
      take: Number(take),
      skip: Number(skip),
    })

    return products
  }
}

export { ListProduct }
