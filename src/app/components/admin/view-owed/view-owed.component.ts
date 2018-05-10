import { Component, OnInit } from '@angular/core';
import { Seller } from '../../../models/seller';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-view-owed',
  templateUrl: './view-owed.component.html',
  styleUrls: ['./view-owed.component.css']
})
export class ViewOwedComponent implements OnInit {
  sellers: Seller[] = new Array();

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllSellers().subscribe(sellers => {
      this.sellers = sellers;
    });
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
