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

  constructor(private cartService: CartService) {}

  ngOnInit() {
    const customer = localStorage.getItem('customer');
    if (customer != null) {
      this.cartService.getCartItemsByCustomerId(JSON.parse(customer).customerId).subscribe(cart => {
        this.cartItem = cart;
        for (const cartItem of this.cartItem) {
          this.totalPrice += cartItem.cartItemId.item.price;
        }
      });
    }
  }

}
