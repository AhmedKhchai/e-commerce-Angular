import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from '../../../shared/interfaces/products';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filterdProducts: Product[];
  productsRef: AngularFireList<any>;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private db: AngularFireDatabase
  ) {
    this.subscription = this.productService
      .getAll()
      .subscribe(
        (products) => (this.filterdProducts = this.products = products)
      );

    /*
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c) => ({
            key: c.payload.key,
            ...(c.payload.val() as {}),
          }));
        })
      );*/

    /*.snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((actions) => ({
            kkey: actions.key,
            val: actions.payload.val(),
          }));
        })
      );*/
    /*this.products$ = this.productsRef.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      })
    );*/
    /*this.products$ = this.productsRef.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((action) => ({
          key: action.key,
          val: action.payload.val(),
        }));
      })
    );*/
  }

  filter(query) {
    this.filterdProducts = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe;
  }
  ngOnInit(): void {}
}
