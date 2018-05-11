import { Component, OnInit } from '@angular/core';
import { Seller } from '../../../models/seller';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { AccountsService } from '../../../services/accounts.service';

@Component({
  selector: 'app-view-owed',
  templateUrl: './view-owed.component.html',
  styleUrls: ['./view-owed.component.css']
})
export class ViewOwedComponent implements OnInit {
  sellers: Seller[] = new Array();
  admin: boolean = (localStorage.getItem('admin') !== null) ? true : false;
  loggedIn: boolean = (localStorage.getItem('accType') !== null) ? true : false;

  constructor(private adminService: AdminService, private router: Router, private accService: AccountsService) { }

  ngOnInit() {
    this.accService.getLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    this.accService.getAdmin().subscribe(admin => {
      this.admin = admin;
    });
    if (this.admin) {
      this.adminService.getAllSellers().subscribe(sellers => {
        this.sellers = sellers;
      });
    } else if (!this.loggedIn) {
      this.router.navigate(['401']);
    } else {
      this.router.navigate(['403']);
    }
  }

  payOff(seller: Seller) {
    seller.money = 0;
    this.adminService.updateSeller(seller).subscribe(updatedSeller => {
      this.adminService.getAllSellers().subscribe(sellers => {
        this.sellers = sellers;
      });
    });
  }

}
