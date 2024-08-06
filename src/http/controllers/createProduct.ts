import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaProductRepository } from "../../repositories/product/prisma/product-repository";
import { CreateProduct } from "../../use-cases/products/create-product";

async function createProduct(request: FastifyRequest, reply: FastifyReply) {
  const inMemoryProductRepository = new PrismaProductRepository()
  const createProductUseCase = new CreateProduct(inMemoryProductRepository)

  const productBodySchema = z.object({
    name: z.string(),
    description: z.string().min(6),
  })

  const { body } = request

  const { name, description } = productBodySchema.parse(body)

  const product = await createProductUseCase.execute({
    name,
    description
  })  

  return reply.code(201).send(product)

}

export { createProduct };
