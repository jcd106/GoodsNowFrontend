import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../../models/customer';
import { Seller } from '../../../models/seller';
import { Admin } from '../../../models/admin';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(private router: Router) { }

  accType: String = localStorage.getItem('accType');
  seller: Seller = JSON.parse(localStorage.getItem('seller'));
  customer: Customer = JSON.parse(localStorage.getItem('customer'));
  admin: Admin = JSON.parse(localStorage.getItem('admin'));

  ngOnInit() {
  }

  update() {
    console.log(this.seller);
  }

}

