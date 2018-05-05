import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
  }

  navCategory(cat: String) {
    this.productsService.setCategory(cat);
    this.router.navigate(['/browse']);
  }

}
