import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loggedIn: boolean = (localStorage.getItem('user') !== null) ? true : false;

  constructor(private accService: AccountsService, private productsService: ProductsService, private router: Router) { 
    this.accService.getLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
  }

  ngOnInit() {
  }

  navCategory(cat: String) {
    this.productsService.setCategory(cat);
    this.router.navigate(['/browse']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['access']);
  }
}
