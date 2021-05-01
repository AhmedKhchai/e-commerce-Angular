import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ShopingCartService } from 'src/app/shared/services/shoping-cart.service';

import { Order } from '../../../shared/interfaces/order';
import { shoppingCart } from '../../../shared/interfaces/shopping-cart';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  constructor(
    private shoppingCartService: ShopingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  subscription: Subscription;
  order: Order[];
  cart$: Observable<shoppingCart>;
  orders$;
  id;
  items = {};
  ngOnInit() {
    // if (this.id)
    //   this.subscription = this.orderService
    //     .getOrderById(this.id)
    //     .valueChanges()
    //     .pipe(take(1))
    //     .subscribe((p: Order[]) => (this.order = p));
    // console.log(this.order);

    // this.cart$ = await this.shoppingCartService.getCart();
    // console.log(this.cart$);

    
    this.orderService.getOrderById(this.id).subscribe((x) => {
      this.items = x;
      console.log(this.items);
    });
    console.log(this.items);
  }
}
