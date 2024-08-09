


import { CartItem } from "@prisma/client"
import { CartRepository } from "../../repositories/cart/cart-repository"

type IncrementAndDecrementToCartItemRequest = {
  cartId: string
  cartItemId: string
  action: 'increment' | 'decrement'
}

type IncrementAndDecrementToCartItemResponse = CartItem

class IncrementAndDecrementToCartItem {
  constructor(
    private cartRepository: CartRepository
  ) { }

  async execute(request: IncrementAndDecrementToCartItemRequest): Promise<IncrementAndDecrementToCartItemResponse> {
    const { action, cartId, cartItemId } = request

    const cart = await this.cartRepository.find(cartId)

    if (!cart) {
      throw new Error("Cart not found!!!");
    }

    const cartItem = await this.cartRepository.changeQuantityCartItem({ action, cartId, cartItemId })

    return cartItem;
  }
}

export { IncrementAndDecrementToCartItem, IncrementAndDecrementToCartItemRequest }
