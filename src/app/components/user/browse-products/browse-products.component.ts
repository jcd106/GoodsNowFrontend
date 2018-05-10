import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Item } from '../../../models/Item';
import { CartItem } from '../../../models/cartItem';
import { CartItemId } from '../../../models/cartItemId';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-browse-products',
  templateUrl: './browse-products.component.html',
  styleUrls: ['./browse-products.component.css']
})
export class BrowseProductsComponent implements OnInit {
  page = 1;
  category: String = '';
  items: Item[] = new Array(0);

  constructor(private cartService: CartService, private productsService: ProductsService) { }

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

  get pageProducts() {
    return this.items.slice((this.page - 1) * 10, this.page * 10);
  }

  addToCart(item) {
    const cartItemId = new CartItemId();
    cartItemId.item = item;
    cartItemId.customer = JSON.parse(localStorage.getItem('customer'));
    const cartItem = new CartItem();
    cartItem.cartItemId = cartItemId;
    cartItem.quantity = 1;
    this.cartService.addItem(cartItem).subscribe(cartItem => {
      this.cartService.updateCartCount();
    });
  }

}
