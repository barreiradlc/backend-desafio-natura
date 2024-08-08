import { Prisma, Product } from "@prisma/client";

interface ProductRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>;
  list(query?: string): Promise<Product[]>;
}

export { ProductRepository };

