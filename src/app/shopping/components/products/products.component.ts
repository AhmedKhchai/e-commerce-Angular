import { ShopingCartService } from '../../../shared/services/shoping-cart.service';
import { Product } from '../../../shared/interfaces/products';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filterdProducts: Product[] = [];
  category: string;
  cart: any;
  cart$: Observable<any>;
  subscription: Subscription;
  constructor(
    productService: ProductService,
    route: ActivatedRoute,
    private cartService: ShopingCartService
  ) {
    productService
      .getAll()
      .subscribe(
        (products) => (this.filterdProducts = this.products = products)
      );

    route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');

      /****filtering categories************/
      this.filterdProducts = this.category
        ? this.products.filter((p) => p.category === this.category)
        : this.products;
    });
  }

  filter(query) {
    this.filterdProducts = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(
      (cart) => (this.cart = cart)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
