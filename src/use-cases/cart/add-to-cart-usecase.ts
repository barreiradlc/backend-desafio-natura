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
    const {  productId, quantity } = request

    if (!cartId) {
      const { id } = await this.cartRepository.create()

      cartId = id
    }
  
    const cart = await this.cartRepository.addItem({ cartId, productId, quantity })

    return cart;
  }
}

export { AddToCart }
