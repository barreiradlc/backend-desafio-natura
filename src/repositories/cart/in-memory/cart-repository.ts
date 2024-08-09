import { randomUUID } from "crypto";
import { CartEntity, CartItemEntity, CartRepository, ChangeQuantityCartItem } from "../cart-repository";
import { AddToCartDTO } from "../dtos/add-to-cart-dto";

class InMemoryCartRepository implements CartRepository {
  public carts: CartEntity[] = [];
  
  async changeQuantityCartItem({ cartId, cartItemId, action}: ChangeQuantityCartItem ): Promise<CartItemEntity> {
    const [cartSelected] = this.carts.filter((cart) => cart.id === cartId)
    const [cartItemSelected] = cartSelected.items.filter((cartItem) => cartItem.id === cartItemId)

    if (action === 'increment') { cartItemSelected.quantity++ }
    if (action === 'decrement') { cartItemSelected.quantity-- }

    return cartItemSelected
  }
  
  async find(cartId: string): Promise<CartEntity> {
    const [cartSelected] = this.carts.filter((cart) => cart.id === cartId)
    
    return cartSelected
  }

  async addItem({ cartId, product, productId, quantity }: AddToCartDTO): Promise<CartEntity> {
    const [ cartSelected ] = this.carts.filter((cart) => cart.id === cartId)

    const [ productAlreadyAdded ] = cartSelected.items.filter(( cartItem ) => cartItem.productId === productId)
    
    if (productAlreadyAdded) {
      productAlreadyAdded.quantity += quantity      
    } else {
      cartSelected.items.push({
        id: randomUUID(),
        cartId,
        productId,
        quantity,
        product
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
