import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaProductRepository } from "../../../repositories/product/prisma/product-repository";
import { ListProduct } from "../../../use-cases/products/list-product";

async function listProduct(request: FastifyRequest, reply: FastifyReply) {
  const inMemoryProductRepository = new PrismaProductRepository()
  const listProductUseCase = new ListProduct(inMemoryProductRepository)

  const productQueryParamSchema = z.object({
    query: z.string().optional(),
    take: z.string().optional(),
    skip: z.string().optional(),
  })

  const { query: queryParams } = request

  const { query, take, skip } = productQueryParamSchema.parse(queryParams)

  const products = await listProductUseCase.execute({
    query,
    take: Number(take),
    skip: Number(skip),
  })

  return reply.code(200).send(products)
}

export { listProduct };
