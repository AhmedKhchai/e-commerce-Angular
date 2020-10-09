import { Shipping } from '../../../shared/interfaces/shipping';
import { Order } from '../../../shared/interfaces/order';
import { AngularFireDatabase } from 'angularfire2/database';
import { OrderService } from 'src/app/shared/services/order.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { shoppingCart } from '../../../shared/interfaces/shopping-cart';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  @Input('shipping') shipping: Shipping;
  @Input('cart') cart: shoppingCart;

  orders: Order[];
  subscription: Subscription;
  orders$;
  constructor(
    private orderService: OrderService,
    private db: AngularFireDatabase
  ) {
    // this.subscription = this.orderService
    //   .getOrders()
    //   .subscribe((orders) => (this.orders = orders));
    this.orders$ = orderService.getOrders();
  }

  ngOnInit() {}
}
