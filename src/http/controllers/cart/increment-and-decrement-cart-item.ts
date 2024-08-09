import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaCartRepository } from "../../../repositories/cart/prisma/cart-repository";
import { IncrementAndDecrementToCartItem } from "../../../use-cases/cart/increment-and-decrement-cart-item-usecase";

async function incrementOrDecrementCardItem(request: FastifyRequest, reply: FastifyReply) {
  const prismaCartRepository = new PrismaCartRepository()
  const incrementAndDecrementToCartItemUseCase = new IncrementAndDecrementToCartItem(prismaCartRepository)

  const cartItemBodySchema = z.object({
    action: z.enum(['increment', 'decrement'])
  })

  const cartItemParamsSchema = z.object({
    cartId: z.string(),
    cartItemId: z.string(),
  })

  const { body, params } = request

  try {
    const { cartId, cartItemId } = cartItemParamsSchema.parse(params)
    const { action } = cartItemBodySchema.parse(body)

    const cartItem = await incrementAndDecrementToCartItemUseCase.execute({
      cartId, cartItemId, action
    })

    return reply.code(200).send(cartItem)
  } catch (error) {
    return reply.code(500).send(error)
  }
}

export { incrementOrDecrementCardItem };
