import { Cart, CartItem, Prisma } from "@prisma/client";
import { AddToCartDTO } from "./dtos/add-to-cart-dto";

interface CartEntity extends Cart {
  items: CartItem[]
}

interface CartRepository {
  create(): Promise<Cart>;
  find(cartId: string): Promise<Cart>;
  addItem(data: Prisma.CartItemCreateInput | AddToCartDTO): Promise<Cart>;
}

export { CartEntity, CartRepository };

