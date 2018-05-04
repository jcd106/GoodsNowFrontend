import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
  }

  navCategory(cat: string) {
    this.productsService.setCategory(cat);
  }

}
