import { shoppingCart } from '../../../shared/interfaces/shopping-cart';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../shared/interfaces/products';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css'],
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input('cart') cart: shoppingCart;
  @Input('product') product: Product;

  constructor() {}

  ngOnInit() {}
}
