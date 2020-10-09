import { Product } from './products';
import { ShoppingItem } from './ShoppingItem';

export class shoppingCart {
  items: ShoppingItem[] = [];
  constructor(private itemsMap: { [productId: string]: ShoppingItem }) {
    this.itemsMap = itemsMap || {};
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      // let x = new ShoppingItem();
      // Object.assign(x, item);
      // x.key = productId;
      // this.items.push(x);
      this.items.push(new ShoppingItem(item.product, item.quantity));
    }
  }

  get productIds() {
    return Object.keys(this.items);
  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap)
      count += this.itemsMap[productId].quantity;
    return count;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) sum += this.items[productId].totalPrice;
    return sum;
  }
}
