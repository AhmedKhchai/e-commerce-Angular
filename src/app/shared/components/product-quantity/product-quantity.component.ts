import { Component, OnInit, Input } from '@angular/core';
import { ShopingCartService } from 'src/app/shared/services/shoping-cart.service';
import { shoppingCart } from '../../interfaces/shopping-cart';
import { Product } from '../../interfaces/products';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css'],
})
export class ProductQuantityComponent {
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
