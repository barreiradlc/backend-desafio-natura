import { describe, expect, it, suite } from "vitest";
import { InMemoryProductRepository } from "../../repositories/product/in-memory/product-repository";
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

  suite("Should query based on input provided", () => {
    it("Should be able to list products by name", async () => {
      const productDTO = {
        name: "Kayak 02 Masculino 100ml",
        description: "Experimente a refrescância única de Kaiak Desodorante Colônia Masculino. Sinta-se revigorado e confiante!"
      }
      const inMemoryProductRepository = new InMemoryProductRepository()
      const createProductUseCase = new CreateProduct(inMemoryProductRepository)
      const sut = new ListProduct(inMemoryProductRepository)
      
      await createProductUseCase.execute(productDTO)
      await createProductUseCase.execute({
        name: "Floratta",
        description: productDTO.description
      })
    
      const searchedProducts = await sut.execute({ query: 'Floratta' })
      expect(searchedProducts.length).toEqual(1)
    })  
    
    it("Should be able to list products by description", async () => {
      const productDTO = {
        name: "Kayak 02 Masculino 100ml",
        description: "Experimente a refrescância única de Kaiak Desodorante Colônia Masculino. Sinta-se revigorado e confiante!"
      }
      const inMemoryProductRepository = new InMemoryProductRepository()
      const createProductUseCase = new CreateProduct(inMemoryProductRepository)
      const sut = new ListProduct(inMemoryProductRepository)
      
      await createProductUseCase.execute(productDTO)
      await createProductUseCase.execute({
        name: productDTO.name,
        description: "Um excelente perfume para dias ensolarados.",
      })
    
      const searchedProducts = await sut.execute({ query: 'ensolarados' })
      expect(searchedProducts.length).toEqual(1)
    })
  })
})