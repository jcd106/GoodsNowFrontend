import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../models/cartItem';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItem: CartItem[] = new Array();
  totalPrice: Number = 0;
  updatedCartItem: CartItem = new CartItem();

  constructor(private cartService: CartService) {}

  ngOnInit() {
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
  }

  updateCartItem(item: CartItem) {
    item.quantity = this.updatedCartItem.quantity;
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
