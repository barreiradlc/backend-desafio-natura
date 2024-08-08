import { prisma } from "../../../lib/prisma";
import { CartEntity, CartRepository } from "../cart-repository";
import { AddToCartDTO } from "../dtos/add-to-cart-dto";

class PrismaCartRepository implements CartRepository {
  async find(cartId: string): Promise<CartEntity> {
    const cartSelected = await prisma.cart.findUniqueOrThrow({
      where: {
        id: cartId
      },
      include: {
        items: true
      }
    })
    
    return cartSelected
  }

  async addItem({ cartId, productId, quantity }: AddToCartDTO): Promise<CartEntity> {
    try {
      const cartItemWithproductAlreadyAdded = await prisma.cartItem.findFirst({ 
        where: {
          AND: [
            {
              cartId
            },
            {
              productId
            },
          ]
        }
      })
      
      if (cartItemWithproductAlreadyAdded) {
        const newQuantity = quantity + cartItemWithproductAlreadyAdded.quantity
        
        await prisma.cartItem.update({
          where: {
            id: cartItemWithproductAlreadyAdded.id
          },
          data: { 
            quantity: newQuantity
          }
        })
      } else {      
        await prisma.cart.update({
          where: {
            id: cartId
          },
          data: {
            items: {
              create: {
                quantity,
                product: { connect: { id: productId } },
              }
            }
          }
        })
      }
      
      const cart = await prisma.cart.findUniqueOrThrow({
        where: {
          id: cartId
        },               
        select: {
          id: true,
          items: true
        }
      })

      return cart
    } catch (error) {
      throw new Error(`Error adding products to the cart: ${error}`, )
    }
  }  
  
  async create() {
    const cart = await prisma.cart.create({ data: {} })    

    return cart
  }
}

export { PrismaCartRepository };
