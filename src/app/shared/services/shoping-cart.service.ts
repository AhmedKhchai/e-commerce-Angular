import { async } from '@angular/core/testing';
import { ShoppingItem } from '../interfaces/ShoppingItem';
import { take, map } from 'rxjs/operators';
import { Product } from '../interfaces/products';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { shoppingCart } from '../interfaces/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopingCartService {
  constructor(private db: AngularFireDatabase) {}
  async getCart(): Promise<Observable<shoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(map((x) => new shoppingCart(x.payload.exportVal().items)));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

    // Add product to cart
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item) => {
        if (item.payload.exists()) {
          let quantity = item.payload.exportVal().quantity + change;
          if (quantity === 0) item$.remove();
          else
            item$.update({
              product: product,
              quantity: quantity,
              // title: product.title,
              // imageURL: product.imageUrl,
              // price: product.price,
              // quantity: (quantity || 0) + change,
            });
        } else {
          item$.set({ product: product, quantity: 1 });
        }
      });
  }
}
