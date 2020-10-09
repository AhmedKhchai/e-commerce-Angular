import { shoppingCart } from 'src/app/shared/interfaces/shopping-cart';
import { Shipping } from './shipping';
export class Order {
  // key: string;
  datePlaced: number;
  items: any[];
  // netPrice: number;
  // user: {
  //   username: string;
  //   userId: string;
  // };
  constructor(
    public userId: string,
    public shipping: Shipping,
    shoppingcart: shoppingCart
  ) {
    this.datePlaced = new Date().getTime();
    this.items = shoppingcart.items.map((item) => {
      return {
        product: {
          title: item.title,
          imageUrl: item.imageUrl,
          price: item.price,
        },
        quantity: item.quantity,
        // price: item.price,
        totalPrice: item.totalPrice,
      };
    });
    // this.user = {
    //   userId: userId,
    //   username: name,
    // };

    // this.netPrice = shoppingcart.totalPrice;
  }
}
