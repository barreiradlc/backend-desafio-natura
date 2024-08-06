import { FastifyInstance } from "fastify";
import { createProduct } from "./controllers/products/createProduct";
import { listProduct } from "./controllers/products/listProducts";

async function appRoutes(app: FastifyInstance) {
  app.post('/products', createProduct)
  app.get('/products', listProduct)
  
}

export { appRoutes };
