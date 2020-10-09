import { shoppingCart } from '../../interfaces/shopping-cart';
import { Product } from '../../interfaces/products';
import { Component, OnInit, Input } from '@angular/core';
import { ShopingCartService } from '../../services/shoping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: shoppingCart;

  constructor(private cartsevice: ShopingCartService) {}

  addtocart() {
    this.cartsevice.addToCart(this.product);
  }

  removefromcart() {
    this.cartsevice.removeFromCart(this.product);
  }
}
