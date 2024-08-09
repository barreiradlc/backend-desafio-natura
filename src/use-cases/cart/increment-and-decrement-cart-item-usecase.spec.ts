import { describe, expect, it } from "vitest"
import { InMemoryCartRepository } from "../../repositories/cart/in-memory/cart-repository"
import { IncrementAndDecrementToCartItem } from "./increment-and-decrement-cart-item-usecase"

describe("Increment and decrement CartItem UseCase", () => {
  it("Should be able to increment item from an cart", async () => {
    const inMemoryCartRepository = new InMemoryCartRepository()
    const sut = new IncrementAndDecrementToCartItem(inMemoryCartRepository)

    const { id: cartId } = await inMemoryCartRepository.create()
    const { items: [newItem] } = await inMemoryCartRepository.addItem({
      cartId,
      productId: 'fake-product-id',
      quantity: 3
    })

    const cartItem = await sut.execute({
      cartId,
      cartItemId: newItem.id,
      action: "increment"
    })

    expect(cartItem.id).toBeDefined()
    expect(cartItem.quantity).toEqual(4)
    expect(cartItem)
      .toEqual(expect.objectContaining({
        id: expect.any(String),
        quantity: expect.any(Number)
      })
      )
  })

  it("Should be able to decrement item from an cart", async () => {
    const inMemoryCartRepository = new InMemoryCartRepository()
    const sut = new IncrementAndDecrementToCartItem(inMemoryCartRepository)

    const { id: cartId } = await inMemoryCartRepository.create()
    const { items: [newItem] } = await inMemoryCartRepository.addItem({
      cartId,
      productId: 'fake-product-id',
      quantity: 3
    })

    const cartItem = await sut.execute({
      cartId,
      cartItemId: newItem.id,
      action: "decrement"
    })

    expect(cartItem.id).toBeDefined()
    expect(cartItem.quantity).toEqual(2)
    expect(cartItem)
      .toEqual(expect.objectContaining({
        id: expect.any(String),
        quantity: expect.any(Number)
      })
      )
  })
})

