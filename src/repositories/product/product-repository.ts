import { Product } from "@prisma/client";
import { CreateProductDTO } from "./dtos/create-product.dto";

interface ProductRepository {
  create(data: CreateProductDTO): Promise<Product>;
}

export { ProductRepository };

