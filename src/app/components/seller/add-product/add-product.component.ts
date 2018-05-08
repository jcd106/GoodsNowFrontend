import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Item } from '../../../models/Item';
import { Seller } from '../../../models/seller';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  imageId: string;
  imageIsValid: Boolean = true;
  isValid: Boolean = true;
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'goodsnow', uploadPreset: 'project2' })
  );
  item: Item = new Item();
  seller: Seller = JSON.parse(localStorage.getItem('seller'));

  constructor(private location: Location, private router: Router, private prodService: ProductsService) {
    // Override onSuccessItem to retrieve the imageId
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      const res: any = JSON.parse(response);
      this.imageId = res.public_id;
      addProduct();
      return { item, response, status, headers };
    };
    // Override onErrorItem to be alerted to error
    this.uploader.onErrorItem = (item: any, response: string, status: number, headers: any): any => {
      this.imageIsValid = false;
      return { item, response, status, headers };
    };
  }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  upload() {
    this.uploader.uploadAll();
  }

  addProduct(){
    this.item.seller = this.seller;
    this.item.image = this.imageId;
    this.prodService.addItem(this.item).subscribe(item => {
      if (item == null) {
        this.isValid = false;
        console.log('Is null.');
      } else {
        this.prodService.subscribers.next(item);
        console.log(`Product successfully added!`);
        this.router.navigate(['/products']);
      }
    });
  }
}

