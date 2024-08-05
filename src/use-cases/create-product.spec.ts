import { describe, expect, it } from "vitest";
import { InMemoryProductRepository } from "../repositories/product/in-memory/product-repository";
import { CreateProduct } from "./create-product";

describe("Create Product", () => {
  it("Should be able to create product", async () => {
    const productDTO = {
      name: "Kayak 02 Masculino 100ml",
      description: "Experimente a refrescância única de Kaiak Desodorante Colônia Masculino. Sinta-se revigorado e confiante!",
      cart: "cart-id"
    }

    const inMemoryProductRepository = new InMemoryProductRepository()
    const sut = new CreateProduct(inMemoryProductRepository)

    const productCreated = await sut.execute(productDTO)

    expect(productCreated.name).toEqual(productDTO.name)
  })
})