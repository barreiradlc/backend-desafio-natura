import { Cart } from "@prisma/client"
import { CartRepository } from "../../repositories/cart/cart-repository"

type AddToCartRequest = {
  cartId?: string
  productId: string
  quantity: number
}

type AddToCartResponse = Cart

class AddToCart {
  constructor(
    private cartRepository: CartRepository
  ) {}

  async execute(request: AddToCartRequest): Promise<AddToCartResponse> {
    let { cartId } = request
    const { productId, quantity } = request

    let cart

    if (!cartId) {
      const { id } = await this.cartRepository.create()

      cart = await this.cartRepository.addItem({ cartId: id, productId, quantity })
    } else {
      cart = await this.cartRepository.addItem({ cartId, productId, quantity })
    }

    return cart;
  }
}

export { AddToCart }
