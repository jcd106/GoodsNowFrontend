import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../models/cartItem';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItem: CartItem[] = new Array();

  constructor(private cartService: CartService) {}

  ngOnInit() {
  }

  

}
