import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Item } from '../models/item';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ProductsService {
  category: BehaviorSubject<String> = new BehaviorSubject<String>('');
  subscribers: BehaviorSubject<Item> = new BehaviorSubject<Item>(null);

  constructor(private http: HttpClient) { }

  setCategory(cat: String) {
    this.category.next(cat);
  }

  getCategory() {
    return this.category;
  }

  addItem(item: Item) {
    return this.http.post<Item>(environment.backEndApiUrl + 'items', JSON.stringify(item), HTTP_OPTIONS);
  }

  deleteItem(item: Item) {
    return this.http.request<Item>('DELETE', environment.backEndApiUrl + 'items', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(item)
    });
  }

  getItemsByCategory(category: String) {
    return this.http.get<Item[]>(environment.backEndApiUrl + 'items/category=' + category,  HTTP_OPTIONS);
  }

  getItemsByCity(city: String) {
    return this.http.get<Item[]>(environment.backEndApiUrl + 'items/city=' + city,  HTTP_OPTIONS);
  }

  getItemsByZipCode(zipcode: String) {
    return this.http.get<Item[]>(environment.backEndApiUrl + 'items/zipcode=' + zipcode,  HTTP_OPTIONS);
  }

  getItemsByZipSellerId(id) {
    return this.http.get<Item[]>(environment.backEndApiUrl + 'items/sellerId=' + id,  HTTP_OPTIONS);
  }

}
