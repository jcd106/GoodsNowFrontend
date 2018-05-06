import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Account } from '../models/account';


const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable()
export class AccountsService {
  subscribers: BehaviorSubject<Account> = new BehaviorSubject<Account>(null);

  constructor(private http: HttpClient) {
    let acc = localStorage.getItem("account");
    if(acc != "{}" && acc != "undefined") this.subscribers.next(JSON.parse(acc));
  }

  public accountLogin(acc: Account) {
    return this.http.post<Account>(environment.backEndApiUrl+'login', JSON.stringify(acc), HTTP_OPTIONS);
  }

  public customerSignUp(acc: Account) {
    
  }
}
