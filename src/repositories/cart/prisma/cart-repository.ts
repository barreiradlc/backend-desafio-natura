import { Cart } from "@prisma/client";
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

  async addItem({ cartId, productId, quantity }: AddToCartDTO): Promise<Cart> {
    const cartSelected = await prisma.cart.findUniqueOrThrow({
      where: {
        id: cartId
      },
      include: {
        items: true
      }
    })

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
      cartItemWithproductAlreadyAdded.quantity += quantity    
      
      await prisma.cartItem.update({
        where: {
          id: cartItemWithproductAlreadyAdded.id
        },
        data: { 
          quantity: cartItemWithproductAlreadyAdded.quantity + quantity    
        }
      })
    } else {
      await prisma.cartItem.create({
        data: { 
          cartId, productId, quantity
         }
      })      
    }

    return cartSelected
  }  
  
  async create() {
    const cart = await prisma.cart.create({})    

    return cart
  }
}

export { PrismaCartRepository };
