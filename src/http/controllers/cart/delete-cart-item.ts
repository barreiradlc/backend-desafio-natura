import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaCartRepository } from "../../../repositories/cart/prisma/cart-repository";
import { DeleteCartItem } from "../../../use-cases/cart/delete-cart-item-usecase";

async function deleteCardItem(request: FastifyRequest, reply: FastifyReply) {
  const prismaCartRepository = new PrismaCartRepository()
  const deleteCartItemUseCase = new DeleteCartItem(prismaCartRepository)

  const cartItemParamsSchema = z.object({
    cartId: z.string(),
    cartItemId: z.string(),
  })

  const { params } = request

  try {
    const { cartId, cartItemId } = cartItemParamsSchema.parse(params)

    await deleteCartItemUseCase.execute({
      cartId, cartItemId
    })

    return reply.code(204)
  } catch (error) {
    return reply.code(500).send(error)
  }
}

export { deleteCardItem };
