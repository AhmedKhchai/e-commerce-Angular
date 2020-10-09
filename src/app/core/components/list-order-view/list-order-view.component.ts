import { Order } from 'src/app/interfaces/order';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-order-view',
  templateUrl: './list-order-view.component.html',
  styleUrls: ['./list-order-view.component.css'],
})
export class ListOrderViewComponent implements OnInit {
  @Input('order$') order$: Observable<Order[]>;
  constructor() {}

  ngOnInit(): void {}
}
