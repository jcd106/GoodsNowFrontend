import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Account } from '../models/account';
import { Seller } from '../models/seller';
import { Customer } from '../models/customer';
import { Admin } from '../models/admin';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AccountsService {

  customer: BehaviorSubject<Customer> = new BehaviorSubject<Customer>(null);
  seller: BehaviorSubject<Seller> = new BehaviorSubject<Seller>(null);
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>((localStorage.getItem('accType') !== null) ? true : false);
  admin: BehaviorSubject<Admin> = new BehaviorSubject<Admin>(null);

  constructor(private http: HttpClient) {

    const cus = localStorage.getItem('customer');
    if (cus !== '{}' && cus !== 'undefined') { this.customer.next(JSON.parse( cus )); }
    const sel = localStorage.getItem('seller');
    if (sel !== '{}' && sel !== 'undefined') { this.seller.next(JSON.parse( sel )); }
    const ad = localStorage.getItem('admin');
    if (ad !== '{}' && ad !== 'undefined') { this.seller.next(JSON.parse( ad )); }
  }

  public accountLogin(acc: Account) {
    return this.http.post<JSON>(environment.backEndApiUrl + 'login', JSON.stringify(acc), HTTP_OPTIONS);
  }

  public accountUpdate(updatedAcc: Account) {
    return this.http.put<JSON>(environment.backEndApiUrl + 'accounts', JSON.stringify(updatedAcc), HTTP_OPTIONS);
  }

  public customerSignUp(Account: Account, Customer: Customer) {
    return this.http.post<Customer>(environment.backEndApiUrl + 'register/customer', JSON.stringify({Account, Customer}), HTTP_OPTIONS );
  }

  public customerUpdate(updatedCustomer: Customer) {
    return this.http.put<Customer>(environment.backEndApiUrl + 'customers', JSON.stringify(updatedCustomer), HTTP_OPTIONS);
  }

  public sellerSignUp(Account: Account, Seller: Seller) {
    return this.http.post<Seller>(environment.backEndApiUrl + 'register/seller', JSON.stringify({Account, Seller}), HTTP_OPTIONS);
  }

  public sellerUpdate(Seller: Seller) {
    return this.http.put<Seller>(environment.backEndApiUrl + 'sellers', JSON.stringify(Seller), HTTP_OPTIONS);
  }

  public getLoggedIn() {
    return this.loggedIn;
  }
}
