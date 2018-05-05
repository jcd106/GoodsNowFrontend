import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProductsService {
  category: BehaviorSubject<String> = new BehaviorSubject<String>('');

  constructor() { }

  setCategory(cat: String) {
    this.category.next(cat);
  }

  getCategory() {
    return this.category;
  }
}
