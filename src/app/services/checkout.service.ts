import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Order } from '../models/order';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class CheckoutService {

  constructor(private http: HttpClient) { }

  checkout(order: Order) {
    return this.http.post<Order>(environment.backEndApiUrl + 'customers/checkout', JSON.stringify(order), HTTP_OPTIONS);
  }
}
