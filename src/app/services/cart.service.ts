import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CartItem } from '../models/cartItem';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class CartService {
  cartCount: BehaviorSubject<number> = new BehaviorSubject<number>(
    (localStorage.getItem('cart') == null) ? 0 : JSON.parse(localStorage.getItem('cart')).length);

  constructor(private http: HttpClient) { }

  addItem(cartItem: CartItem) {
    return this.http.post<CartItem>(environment.backEndApiUrl + 'cartitems', JSON.stringify(cartItem), HTTP_OPTIONS);
  }

  getCartItemsByCustomerId(id) {
    return this.http.get<CartItem[]>(environment.backEndApiUrl + 'cartitems/' + id,  HTTP_OPTIONS);
  }

  getCartCount() {
    this.cartCount.next((localStorage.getItem('cart') == null) ? 0 : JSON.parse(localStorage.getItem('cart')).length);
    return this.cartCount;
  }

  updateCartCount() {
    const customer = localStorage.getItem('customer');
    if (customer != null) {
      this.getCartItemsByCustomerId(JSON.parse(customer).customerId).subscribe(cart => {
        let cartCount = 0;
        for (const item of cart) {
          cartCount += item.quantity;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.cartCount.next(cartCount);
      });
    }
  }

  updateCartItem(item: CartItem) {
    return this.http.put<CartItem>(environment.backEndApiUrl + 'cartitems/update', JSON.stringify(item), HTTP_OPTIONS);
  }

  deleteCartItem(item: CartItem) {
    return this.http.request<CartItem>('DELETE', environment.backEndApiUrl + 'cartitems', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(item)
    });
  }

}
