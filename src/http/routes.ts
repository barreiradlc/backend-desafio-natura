import { FastifyInstance } from "fastify";
import { addItemToCart } from "./controllers/cart/add-item-to-cart";
import { deleteCardItem } from "./controllers/cart/delete-cart-item";
import { incrementOrDecrementCardItem } from "./controllers/cart/increment-and-decrement-cart-item";
import { createProduct } from "./controllers/products/createProduct";
import { listProduct } from "./controllers/products/listProducts";

async function appRoutes(app: FastifyInstance) {
  // product routes
  app.post('/products', createProduct)
  app.get('/products', listProduct)

  //  cart routes
  app.post('/cart', addItemToCart)


  //  cartItem routes
  app.patch('/cart/:cartId/:cartItemId', incrementOrDecrementCardItem)
  app.delete('/cart/:cartId/:cartItemId', deleteCardItem)
}

export { appRoutes };
