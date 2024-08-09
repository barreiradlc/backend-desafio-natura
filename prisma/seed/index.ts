import { prisma } from "../../src/lib/prisma"
import { products } from "./products"

async function seed() {
  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }
}

seed().then(() => {
  console.log(`Seed completed!`)
  prisma.$disconnect()
})