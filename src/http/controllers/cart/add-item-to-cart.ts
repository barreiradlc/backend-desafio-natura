import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaCartRepository } from "../../../repositories/cart/prisma/cart-repository";
import { AddToCart } from "../../../use-cases/cart/add-to-cart-usecase";

async function addItemToCart(request: FastifyRequest, reply: FastifyReply) {
  const inMemoryCartRepository = new PrismaCartRepository()
  const addToCartUseCase = new AddToCart(inMemoryCartRepository)

  const cartItemBodySchema = z.object({
    cartId: z.string().optional(),
    productId: z.string(),
    quantity: z.number()
  })

  const { body } = request

  try {
    const { productId, quantity, cartId } = cartItemBodySchema.parse(body)

    const cart = await addToCartUseCase.execute({
      productId, quantity, cartId
    })  

    return reply.code(200).send(cart)
  } catch (error) {    
    return reply.code(500).send(error)
  }
}

export { addItemToCart };
