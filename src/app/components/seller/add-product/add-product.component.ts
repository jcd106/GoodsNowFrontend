import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  imageId: string;
  imageIsValid: Boolean = true;
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'goodsnow', uploadPreset: 'project2' })
  );

  constructor(private location: Location, private router: Router) {
    // Override onSuccessItem to retrieve the imageId
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      const res: any = JSON.parse(response);
      this.imageId = res.public_id;
      this.router.navigate(['/products']);
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
}
