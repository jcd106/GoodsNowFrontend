import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../models/cartItem';
import { CartService } from '../../../services/cart.service';
import { AccountsService } from '../../../services/accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItem: CartItem[] = new Array();
  totalPrice: Number = 0;
  customer: boolean = (localStorage.getItem('customer') !== null) ? true : false;
  loggedIn: boolean = (localStorage.getItem('accType') !== null) ? true : false;

  constructor(private cartService: CartService, private accService: AccountsService, private router: Router) {}

  ngOnInit() {
    this.accService.getLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    this.accService.getCustomer().subscribe(customer => {
      this.customer = customer;
    });
    if (this.customer) {
      const customer = localStorage.getItem('customer');
      if (customer != null) {
        this.cartService.getCartItemsByCustomerId(JSON.parse(customer).customerId).subscribe(cart => {
          this.cartItem = cart;
          for (const cartItem of this.cartItem) {
            let totalPrice = this.totalPrice.valueOf();
            totalPrice += cartItem.cartItemId.item.price * cartItem.quantity;
            this.totalPrice = totalPrice;
          }
        });
      }
    } else if (!this.loggedIn) {
      this.router.navigate(['401']);
    } else {
      this.router.navigate(['403']);
    }
  }

  updateCartItem(item: CartItem) {
    this.cartService.updateCartItem(item).subscribe(cartItem => {
      const customer = localStorage.getItem('customer');
      if (customer != null) {
        this.cartService.getCartItemsByCustomerId(JSON.parse(customer).customerId).subscribe(cart => {
          this.cartItem = cart;
          this.totalPrice = 0;
          for (const cartItem of this.cartItem) {
            let totalPrice = this.totalPrice.valueOf();
            totalPrice += cartItem.cartItemId.item.price * cartItem.quantity;
            this.totalPrice = totalPrice;
          }
        });
      }
    });
  }

  deleteCartItem(item: CartItem) {
    console.log('Delete');
    this.cartService.deleteCartItem(item).subscribe(cartItem => {
      const customer = localStorage.getItem('customer');
      if (customer != null) {
        this.cartService.getCartItemsByCustomerId(JSON.parse(customer).customerId).subscribe(cart => {
          this.cartItem = cart;
          this.totalPrice = 0;
          for (const cartItem of this.cartItem) {
            let totalPrice = this.totalPrice.valueOf();
            totalPrice += cartItem.cartItemId.item.price * cartItem.quantity;
            this.totalPrice = totalPrice;
          }
          this.cartService.updateCartCount();
        });
      }
    });
  }
}
