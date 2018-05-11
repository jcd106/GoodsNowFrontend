import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../models/customer';
import { Order } from '../../../models/order';
import { Item } from '../../../models/item';
import { OrderItem } from '../../../models/orderItem';
import { AccountsService } from '../../../services/accounts.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  constructor(private accService: AccountsService) { }

  customer: Customer = JSON.parse(localStorage.getItem('customer'));

  orders: Array<Order>;
  orderItems: Array<Array<OrderItem>> = new Array<Array<OrderItem>>();

  ngOnInit() {
    this.getOrders();
    // console.log(this.orderItems);
  }

  getOrders() {
    this.accService.customerGetOrderHistory(this.customer).subscribe(ords => {
      if (ords == null) {
        console.log('no orders or failed to get orders');
      } else {
        this.orders = JSON.parse(JSON.stringify(ords));
      }
      this.getOrderItems();
    });
  }

  getOrderItems() {
    for (let i = 0; i < this.orders.length; i++) {
      console.log('retreving orderitems for' + this.orders[i].orderId);
      this.accService.customerGetOrderItems(this.orders[i].orderId).subscribe(ordItms => {
        if (ordItms == null) {
          console.log('failed to get order items');
        } else {
          this.orderItems.push(JSON.parse(JSON.stringify(ordItms)));
        }
        console.log(this.orderItems);
      });
    }
  }

}
