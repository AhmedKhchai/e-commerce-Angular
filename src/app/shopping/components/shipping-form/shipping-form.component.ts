import { shoppingCart } from '../../../shared/interfaces/shopping-cart';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../../../shared/interfaces/order';
import { Shipping } from '../../../shared/interfaces/shipping';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: shoppingCart;

  shipping: Shipping = {} as Shipping;
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
    this.userSubscription = this.authService.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }
  // async placeOrder() {
  //   let x = new Order(this.userId, this.shipping, this.cart);
  //   // let order = {
  //   //   userId: this.userId,
  //   //   datePlaced: new Date().getTime(),
  //   //   shipping: this.shipping,
  //   //   totalPrice: this.cart.totalPrice,
  //   // };
  //   let result = await this.orderService.placeOrder(x);
  //   this.router.navigate(['/order-success', result.key]);
  // }
  async placeOrder() {
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items,
      totalPrice: this.cart.totalPrice,
      // this.cart.items.map((i) => {
      //   return {
      //     product: {
      //       title: i.title,
      //       imageUrl: i.imageUrl,
      //       price: i.price,
      //     },
      //     quantity: i.quantity,
      //     totalPrice: i.totalPrice,
      //   };
      // }),
    };
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
