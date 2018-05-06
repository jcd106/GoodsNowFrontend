import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Account } from '../models/account';
import { Seller } from '../models/seller';
import { Customer } from '../models/customer';


const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable()
export class AccountsService {
  account: BehaviorSubject<Account> = new BehaviorSubject<Account>(null);
  customer: BehaviorSubject<Customer> = new BehaviorSubject<Customer>(null);

  constructor(private http: HttpClient) {
    let acc = localStorage.getItem("account");
    if(acc != "{}" && acc != "undefined") this.account.next(JSON.parse(acc));
    let cus = localStorage.getItem("customer");
    if(cus != "{}" && acc != "undefined") this.customer.next(JSON.parse(cus));
  }

  public accountLogin(acc: Account) {
    return this.http.post<Account>(environment.backEndApiUrl+'login', JSON.stringify(acc), HTTP_OPTIONS);
  }

  public customerSignUp(Account: Account, Customer: Customer) {
    return this.http.post<Customer>(environment.backEndApiUrl+'register/customer', JSON.stringify({Account,Customer}), HTTP_OPTIONS);
  }

  public sellerSignUp(Account: Account, Seller: Seller) {
    return this.http.post<Customer>(environment.backEndApiUrl+'register/seller', JSON.stringify({Account,Seller}), HTTP_OPTIONS);
  }
}
