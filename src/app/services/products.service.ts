import { Injectable } from '@angular/core';

@Injectable()
export class ProductsService {
  category: String = '';

  constructor() { }

  setCategory(cat: string) {
    this.category = cat;
  }

  getCategory() {
    return this.category;
  }
}
