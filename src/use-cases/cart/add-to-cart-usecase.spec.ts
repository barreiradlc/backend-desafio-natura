import { describe, expect, it } from "vitest";
import { InMemoryCartRepository } from "../../repositories/cart/in-memory/cart-repository";
import { AddToCart } from "./add-to-cart-usecase";

describe("Add to Cart UseCase", () => {
  it("Should be able to add Item to an existing cart", async () => {
    const inMemoryCartRepository = new InMemoryCartRepository()
    const sut = new AddToCart(inMemoryCartRepository)

    const { id: cartId } = await inMemoryCartRepository.create()
    const cart = await sut.execute({
      cartId,
      productId: 'fake-product-id',
      quantity: 3
    })

    expect(cart.id).toBeDefined()
    expect(cart)
      .toEqual(expect.objectContaining({
        id: expect.any(String),
        items: [
          expect.objectContaining({
            id: expect.any(String)
          })
        ],
      })
      )

  })

  it("Should be able to add Item to a non existing cart", async () => {
    const inMemoryCartRepository = new InMemoryCartRepository()
    const sut = new AddToCart(inMemoryCartRepository)
    
    const cart = await sut.execute({      
      productId: 'fake-product-id',
      quantity: 3
    })

    expect(cart.id).toBeDefined()
    expect(cart)
      .toEqual(expect.objectContaining({
        id: expect.any(String),
        items: [
          expect.objectContaining({
            id: expect.any(String)
          })
        ],
      })
      )
  })
  
  it("Should add the quantity when the product is already added", async () => {
    const inMemoryCartRepository = new InMemoryCartRepository()
    const sut = new AddToCart(inMemoryCartRepository)
    
    const { id } = await sut.execute({      
      productId: 'fake-product-id',
      quantity: 3
    })
    
    await sut.execute({      
      cartId: id,
      productId: 'fake-product-id',
      quantity: 3
    })

    const cart = await inMemoryCartRepository.find(id)

    expect(cart.items).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        productId: 'fake-product-id',
        quantity: 6
      })
    ])
  })
})
