import { Cart } from "@prisma/client";
import { randomUUID } from "crypto";
import { CartEntity, CartRepository } from "../cart-repository";
import { AddToCartDTO } from "../dtos/add-to-cart-dto";

class InMemoryCartRepository implements CartRepository {
  public carts: CartEntity[] = [];
  
  async find(cartId: string): Promise<CartEntity> {
    const [cartSelected] = this.carts.filter((cart) => cart.id === cartId)
    
    return cartSelected
  }

  async addItem({ cartId, productId, quantity }: AddToCartDTO): Promise<Cart> {
    const [ cartSelected ] = this.carts.filter((cart) => cart.id === cartId)

    const [ productAlreadyAdded ] = cartSelected.items.filter(( cartItem ) => cartItem.productId === productId)
    
    if (productAlreadyAdded) {
      productAlreadyAdded.quantity += quantity      
    } else {
      cartSelected.items.push({
        id: randomUUID(),
        cartId,
        productId,
        quantity
      })
    }

    return cartSelected
  }  
  
  async create() {
    const cart = {
      id: randomUUID(),
      items: []
    }

    this.carts.push(cart)

    return cart
  }
}

export { InMemoryCartRepository };
