type AddToCartDTO = {
  id?: string;
  quantity: number;
  cartId: string;
  productId: string;
  product?: {
    id: string
    name: string
    description: string
  }
}

export { AddToCartDTO };

