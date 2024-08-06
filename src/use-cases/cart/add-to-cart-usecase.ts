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
    const { cartId, productId, quantity } = request
    
    let cart: Cart

    if (!cartId) {      
      const { id } = await this.cartRepository.create()
      cart = await this.cartRepository.find(id)
    } else {
      cart = await this.cartRepository.find(cartId)
    }
  
    await this.cartRepository.addItem({ cartId: cart.id, productId, quantity })

    return cart;
  }
}

export { AddToCart }
