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
  customer: boolean = (localStorage.getItem('customer') !== null) ? true : false;
  admin: boolean = (localStorage.getItem('admin') !== null) ? true : false;
  seller: boolean = (localStorage.getItem('seller') !== null) ? true : false;

  constructor(private cartService: CartService, private accService: AccountsService,
    private productsService: ProductsService, private router: Router) {
    this.accService.getLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    this.accService.getCustomer().subscribe(customer => {
      this.customer = customer;
    });
    this.accService.getAdmin().subscribe(admin => {
      this.admin = admin;
    });
    this.accService.getSeller().subscribe(seller => {
      this.seller = seller;
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
    this.accService.currCustomer.next(false);
    this.accService.currAdmin.next(false);
    this.accService.currSeller.next(false);
    this.router.navigate(['access']);
  }
}
