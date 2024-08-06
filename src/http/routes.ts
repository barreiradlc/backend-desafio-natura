import { FastifyInstance } from "fastify";
import { addItemToCart } from "./controllers/cart/add-item-to-cart";
import { createProduct } from "./controllers/products/createProduct";
import { listProduct } from "./controllers/products/listProducts";

async function appRoutes(app: FastifyInstance) {
  app.post('/products', createProduct)
  app.get('/products', listProduct)

  app.post('/cart', addItemToCart)
  
}

export { appRoutes };
