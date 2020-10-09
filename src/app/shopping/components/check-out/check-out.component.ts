import { Observable } from 'rxjs';
import { shoppingCart } from '../../../shared/interfaces/shopping-cart';
import { ShopingCartService } from '../../../shared/services/shoping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  // subscription: Subscription;
  cart: shoppingCart;
  constructor(private shoppingCartService: ShopingCartService) {}
  cart$: Observable<shoppingCart>;

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    // this.subscription = this.cart$.subscribe((cart) => (this.cart = cart));
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
