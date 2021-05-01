import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
})
export class MyordersComponent implements OnInit {
  orders$;
  // id;
  constructor(
    // private OrderService: OrderService,
     private authService: AuthService,
    // private route: ActivatedRoute,
     private orderService: OrderService
  ) {
    // this.id = this.route.snapshot.paramMap.get('id');
    // this.orders$ = orderService.getOrdersByUser(this.id);
    // console.log(this.id);

    
  }
  ngOnInit(): void {
    // console.log(this.id);
     this.orders$ = this.authService.user$
      .pipe(switchMap(user => {
        return this.orderService.getOrdersByUser(user.uid);
      }));
    
  }
}
