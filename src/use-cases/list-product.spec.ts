import { describe, expect, it } from "vitest";
import { InMemoryProductRepository } from "../repositories/product/in-memory/product-repository";
import { CreateProduct } from "./create-product";
import { ListProduct } from "./list-product";

describe("List Product", () => {
  it("Should be able to list products created", async () => {
    const productDTO = {
      name: "Kayak 02 Masculino 100ml",
      description: "Experimente a refrescância única de Kaiak Desodorante Colônia Masculino. Sinta-se revigorado e confiante!"
    }

    const inMemoryProductRepository = new InMemoryProductRepository()
    const createProductUseCase = new CreateProduct(inMemoryProductRepository)
    const sut = new ListProduct(inMemoryProductRepository)

    const productsCreated = [
      await createProductUseCase.execute(productDTO),
      await createProductUseCase.execute(productDTO),
      await createProductUseCase.execute(productDTO),
    ]

    const savedProducts = await sut.execute({ query: '' })

    expect(productsCreated.length).toEqual(savedProducts.length)
  })  
  
  it("Should be able to list 40 products created", async () => {
    const productDTO = {
      name: "Kayak 02 Masculino 100ml",
      description: "Experimente a refrescância única de Kaiak Desodorante Colônia Masculino. Sinta-se revigorado e confiante!"
    }

    const inMemoryProductRepository = new InMemoryProductRepository()
    const createProductUseCase = new CreateProduct(inMemoryProductRepository)
    const sut = new ListProduct(inMemoryProductRepository)

    const productsCreated = []

    for (let index = 0; index < 41; index++) {
      const productCreated = await createProductUseCase.execute(productDTO)            
      productsCreated.push(productCreated)
    }      
    
    const savedProducts = await sut.execute({ query: '' })

    expect(productsCreated.length).toEqual(savedProducts.length)
  })  
})