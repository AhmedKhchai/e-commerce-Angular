import { Product } from './products';

export class ShoppingItem {
  key: string;
  title: string;
  imageUrl: string;
  price: number;
  constructor(public product: Product, public quantity: number) {}

  get totalPrice() {
    return this.product.price * this.quantity;
  }
}
