import { Component, OnInit } from '@angular/core';
import { Seller } from '../../../models/seller';
import { Order } from '../../../models/order';
import { Item } from '../../../models/item';
import { OrderItem } from '../../../models/orderItem';
import { AccountsService } from '../../../services/accounts.service';

@Component({
  selector: 'app-fullfill-order',
  templateUrl: './fullfill-order.component.html',
  styleUrls: ['./fullfill-order.component.css']
})
export class FullfillOrderComponent implements OnInit {

  constructor(private accService: AccountsService) { }

  seller: Seller = JSON.parse(localStorage.getItem('seller'));
  orders: Array<OrderItem> = new Array<OrderItem>();
  orderItems: Array<Array<OrderItem>> = new Array<Array<OrderItem>>();

  ngOnInit() {
    this.getOrders();
    console.log(this.orders);
  }

  getOrders() {
    this.accService.sellerGetOrders(this.seller).subscribe(ords => {
      if (ords == null) {
        console.log('no orders or failed to get orders');
      } else {
        console.log(ords);
        this.orders = ords;
        console.log(this.orders[0].orderItemId.item.itemName);
      }
    });
  }

  fuffill(order: OrderItem) {
    this.accService.sellerUpdateOrder(order).subscribe(ords => {
      if (ords == null) {
        console.log('no orders or failed to get orders');
      } else {
        const index = this.orders.indexOf(order);
        if (index > -1) {
        this.orders[index] = ords;
      }
      }
    });
  }
}
