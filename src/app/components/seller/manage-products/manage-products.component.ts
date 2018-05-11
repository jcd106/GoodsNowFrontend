import { Component, OnInit } from '@angular/core';
import { Item } from '../../../models/Item';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { AccountsService } from '../../../services/accounts.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  items: Item[] = new Array();
  seller: boolean = (localStorage.getItem('seller') !== null) ? true : false;
  loggedIn: boolean = (localStorage.getItem('accType') !== null) ? true : false;

  constructor(private prodService: ProductsService, private accService: AccountsService, private router: Router) {}

  ngOnInit() {
    this.accService.getLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    this.accService.getSeller().subscribe(seller => {
      this.seller = seller;
    });
    if (this.seller) {
      const seller = JSON.parse(localStorage.getItem('seller'));
      this.prodService.getItemsByZipSellerId(seller.sellerId).subscribe(items => {
        this.items = items;
      });
    } else if (!this.loggedIn) {
      this.router.navigate(['401']);
    } else {
      this.router.navigate(['403']);
    }
  }

  deleteItem(item: Item) {
    this.prodService.deleteItem(item).subscribe(item => {
      this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/products']));
    });
  }

}
