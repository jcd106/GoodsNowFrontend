import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-browse-products',
  templateUrl: './browse-products.component.html',
  styleUrls: ['./browse-products.component.css']
})
export class BrowseProductsComponent implements OnInit {
  page = 1;
  products: any[] = new Array(100);
  category: String = '';

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getCategory().subscribe(category => {
      this.category = category;
      console.log(this.category);
    });
  }

  changeCategory(cat: String) {
    this.productsService.setCategory(cat);
  }

}
