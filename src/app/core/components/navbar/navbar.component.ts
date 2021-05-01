import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../../../shared/interfaces/app-user';
import { ShopingCartService } from 'src/app/shared/services/shoping-cart.service';
import { shoppingCart } from '../../../shared/interfaces/shopping-cart';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  cart: shoppingCart;
  cart$: Observable<shoppingCart>;
  shoppingCartItemCount: number;
  constructor(
    private auth: AuthService,
    private cartsevice: ShopingCartService,
    private route: Router
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser));
    console.log(this.appUser);
    
    (await this.cartsevice.getCart()).subscribe((cart) => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });
    // this.cart$ = await this.cartsevice.getCart();
  }
  logout() {
    this.auth.logout();
    location.reload();
  }
}
