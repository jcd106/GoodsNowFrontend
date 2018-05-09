import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../../models/customer';
import { Seller } from '../../../models/seller';
import { Admin } from '../../../models/admin';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router) { }

  accType: String = localStorage.getItem('accType');
  customer: Customer;
  seller: Seller;
  admin: Admin;

  ngOnInit() {
    if (this.accType === 'customer') {
      this.customer = JSON.parse(localStorage.getItem('customer'));
    } else if (this.accType === 'seller') {
      this.seller = JSON.parse(localStorage.getItem('seller'));
    } else if (this.accType === 'admin') {
      this.admin = JSON.parse(localStorage.getItem('admin'));
    }
  }

  navigate(where: String) {
    this.router.navigate([where]);
  }
}
