import { Prisma, Product } from "@prisma/client";

type ListProductParams = {
  query?: string
  take?: number
  skip?: number
}

interface ProductRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>;
  list(params?: ListProductParams): Promise<Product[]>;
}

export { ListProductParams, ProductRepository };

