import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Item } from '../../../models/Item';

@Component({
  selector: 'app-browse-products',
  templateUrl: './browse-products.component.html',
  styleUrls: ['./browse-products.component.css']
})
export class BrowseProductsComponent implements OnInit {
  page = 1;
  category: String = '';
  items: Item[] = new Array(0);

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getCategory().subscribe(category => {
      this.category = category;
      this.productsService.getItemsByCategory(this.category).subscribe(items => {
        this.items = items.filter(item => item.category === this.category);
      });
    });
    this.productsService.getItemsByCategory(this.category).subscribe(items => {
      this.items = items;
    });
  }

  changeCategory(cat: String) {
    this.productsService.setCategory(cat);
  }

}
