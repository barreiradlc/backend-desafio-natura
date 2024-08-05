import { FastifyInstance } from "fastify";
import { createProduct } from "./controllers/createProduct";

async function appRoutes(app: FastifyInstance) {
  app.post('/products', createProduct)
  
}

export { appRoutes };
