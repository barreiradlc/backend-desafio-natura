


import { CartItem } from "@prisma/client"
import { CartRepository } from "../../repositories/cart/cart-repository"

type DeleteCartItemRequest = {
  cartId: string
  cartItemId: string
}

type DeleteCartItemResponse = CartItem

class DeleteCartItem {
  constructor(
    private cartRepository: CartRepository
  ) { }

  async execute(request: DeleteCartItemRequest): Promise<void> {
    const { cartId, cartItemId } = request

    const cart = await this.cartRepository.find(cartId)

    if (!cart) {
      throw new Error("Cart not found!!!");
    }

    await this.cartRepository.removeItem({ cartId, cartItemId })

    return;
  }
}

export { DeleteCartItem, DeleteCartItemRequest }
