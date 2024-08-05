import { FastifyInstance } from "fastify";
import { createProduct } from "./controllers/createProduct";
import { listProduct } from "./controllers/listProducts";

async function appRoutes(app: FastifyInstance) {
  app.post('/products', createProduct)
  app.get('/products', listProduct)
  
}

export { appRoutes };
