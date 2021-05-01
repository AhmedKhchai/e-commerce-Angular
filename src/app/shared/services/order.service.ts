import { Order } from '../interfaces/order';
import { ShopingCartService } from './shoping-cart.service';
import { shoppingCart } from '../interfaces/shopping-cart';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShopingCartService
  ) {}

  // async placeOrder(order) {
  //   let result = await this.db.list('/orders').push(order);
  //   this.shoppingCartService.clearCart();

  //   return result;
  // }
    // private userId = new BehaviorSubject<string>()

  async placeOrder(order) {
    let result = this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db
      .list<Order>('/orders')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c) => ({
            key: c.payload.key,
            ...c.payload.val(),
          }));
        })
      );
  }
  getOrdersByUser(userId: string) {
   return this.db.list<Order>('/orders', ref => ref.orderByChild('userId').equalTo(userId))
     .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c) => ({
            key: c.payload.key,
            ...c.payload.val(),
          }));
        })
      );
  }
  getOrderById(orderId: string) {
    return this.db.object('/orders/' + orderId + '/items').valueChanges();
    
    // .valueChanges()
    // .subscribe((res) => {
    //   console.log(res);
    // });
    // return this.db
    //   .list<Order>('/orders'  + orderId)
    //   .snapshotChanges()
    //   .pipe(
    //     map((changes) => {
    //       return changes.map((c) => ({
    //         key: c.payload.key,
    //         ...c.payload.val(),
    //       }));
    //     })
    //   );
  }
}
