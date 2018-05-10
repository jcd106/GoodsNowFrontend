import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Seller } from '../models/seller';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllSellers() {
    return this.http.get<Seller[]>(environment.backEndApiUrl + 'sellers',  HTTP_OPTIONS);
  }

  updateSeller(seller: Seller) {
    return this.http.put<Seller>(environment.backEndApiUrl + 'sellers', JSON.stringify(seller), HTTP_OPTIONS);
  }

}
