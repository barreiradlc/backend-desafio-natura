import { Cart, CartItem, Prisma, Product } from "@prisma/client";
import { AddToCartDTO } from "./dtos/add-to-cart-dto";

interface CartItemEntity extends CartItem { 
  product: Product
}

interface CartEntity extends Cart {
  items: CartItemEntity[] 
}

type ChangeQuantityCartItem = {
  cartId: string
  cartItemId: string
  action: 'increment' | 'decrement'
}

interface CartRepository {
  create(): Promise<Cart>;
  find(cartId: string): Promise<CartEntity>;
  addItem(data: Prisma.CartItemCreateInput | AddToCartDTO): Promise<Cart>;
  changeQuantityCartItem(data: ChangeQuantityCartItem): Promise<CartItemEntity>;
}

export { CartEntity, CartItemEntity, CartRepository, ChangeQuantityCartItem };

