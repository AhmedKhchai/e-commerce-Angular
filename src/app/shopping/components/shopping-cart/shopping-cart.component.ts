import { shoppingCart } from '../../../shared/interfaces/shopping-cart';
import { ShopingCartService } from '../../../shared/services/shoping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../shared/interfaces/products';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: shoppingCart;
  cart$;
  shoppingCartItemCount: number;

  constructor(private shoppingCartService: ShopingCartService) {}

  async ngOnInit(): Promise<any> {
    this.cart$ = await this.shoppingCartService.getCart();
  }
  addtocart() {
    this.shoppingCartService.addToCart(this.product);
  }

  removefromcart() {
    this.shoppingCartService.removeFromCart(this.product);
  }
  clearCart() {
    this.shoppingCartService.clearCart();
  }
}
