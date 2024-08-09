import { describe, expect, it } from "vitest"
import { InMemoryCartRepository } from "../../repositories/cart/in-memory/cart-repository"
import { DeleteCartItem } from "./delete-cart-item-usecase"

describe("Delete CartItem UseCase", () => {
  it("Should be able to delete item from an cart", async () => {
    const inMemoryCartRepository = new InMemoryCartRepository()
    const sut = new DeleteCartItem(inMemoryCartRepository)

    const cart = await inMemoryCartRepository.create()
    await inMemoryCartRepository.addItem({
      cartId: cart.id,
      productId: 'fake-product-id-1',
      quantity: 3
    })
    await inMemoryCartRepository.addItem({
      cartId: cart.id,
      productId: 'fake-product-id-2',
      quantity: 3
    })
    const { items: [cartItem] } = await inMemoryCartRepository.addItem({
      cartId: cart.id,
      productId: 'fake-product-id-3',
      quantity: 3
    })
    await sut.execute({
      cartId: cart.id,
      cartItemId: cartItem.id
    })

    const { items } = await inMemoryCartRepository.find(cart.id)

    expect(items).toBeDefined()
    expect(items.length).toEqual(2)
  })


})

