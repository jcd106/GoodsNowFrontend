import { Component, OnInit } from '@angular/core';
import { Item } from '../../../models/Item';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  items: Item[] = new Array();

  constructor(private prodService: ProductsService, private router: Router) {}

  ngOnInit() {
    const seller = JSON.parse(localStorage.getItem('seller'));
    this.prodService.getItemsByZipSellerId(seller.sellerId).subscribe(items => {
      this.items = items;
    });
  }

  deleteItem(item: Item) {
    this.prodService.deleteItem(item).subscribe(item => {
      this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/products']));
    });
  }

}
