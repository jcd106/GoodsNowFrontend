import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loggedIn: boolean = (localStorage.getItem('accType') !== null) ? true : false;
  cartCount: Number = (localStorage.getItem('cart') == null) ? 0 : JSON.parse(localStorage.getItem('cart')).length;

  constructor(private cartService: CartService, private accService: AccountsService,
    private productsService: ProductsService, private router: Router) {
    this.accService.getLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    this.cartService.getCartCount().subscribe(cartCount => {
      this.cartCount = cartCount;
    });
    this.cartService.updateCartCount();
  }

  ngOnInit() {
  }

  navCategory(cat: String) {
    this.productsService.setCategory(cat);
    this.router.navigate(['/browse']);
  }

  logout() {
    localStorage.clear();
    this.cartService.cartCount.next(0);
    this.accService.loggedIn.next(false);
    this.router.navigate(['access']);
  }
}
