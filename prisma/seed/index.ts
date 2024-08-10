import { prisma } from "../../src/lib/prisma"
import { products } from "./products"

async function seed() {
  for (const product of products) {
    try {
      await prisma.product.create({
        data: {
          ...product,
          price: Math.floor(Math.random() * 10) * 10,
          rating: Math.floor(Math.random() * 5)
        }
      })      
    } catch (error) {
      console.error(error)
    }
  }
}

seed().then(() => {
  console.log(`Seed completed!`)
  prisma.$disconnect()
})