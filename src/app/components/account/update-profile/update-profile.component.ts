import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AccountsService } from '../../../services/accounts.service';
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

  constructor(private accService: AccountsService, private router: Router) { }

  accType: String = localStorage.getItem('accType');
  seller: Seller = JSON.parse(localStorage.getItem('seller'));
  customer: Customer = JSON.parse(localStorage.getItem('customer'));
  admin: Admin = JSON.parse(localStorage.getItem('admin'));

  password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]);
  passwordConfirm = new FormControl('', [Validators.required]);

  ngOnInit() {
  }

  update() {
    if (this.accType === 'customer') {
      console.log(this.customer);
      this.updateCustomer();
    } else if (this.accType === 'seller') {
      console.log(this.seller);
      this.updateSeller();
    }
  }

  updateAccount() {
  }

  updateCustomer() {
    if (this.passwordMatch() && this.password.valid ) {
      this.customer.account.password = this.password.value;
    this.accService.accountUpdate(this.customer.account).subscribe(acc => {
      if (acc == null) {
        console.log('failed to update customers password');
      } else {
        console.log('updated account \n attepting to update customer password');
      }
    });
    }

    this.accService.customerUpdate(this.customer).subscribe(cus => {
      if (cus == null) {
        console.log('failed to update customer');
      } else {
        this.accService.customer.next(cus);
        localStorage.setItem('customer', JSON.stringify(cus));

        this.accService.loggedIn.next(true);
        this.router.navigate(['profile']);
      }
    });
  }

  updateSeller() {
    if (this.passwordMatch() && this.password.valid ) {
      this.seller.account.password = this.password.value;
    this.accService.accountUpdate(this.seller.account).subscribe(sel => {
      if (sel == null) {
        console.log('failed to update seller password');
      } else {
        console.log('updated account \n attepting to update seller password');
      }
    });
    }

    this.accService.sellerUpdate(this.seller).subscribe(sel => {
      if (sel == null) {
        console.log('failed to update seller');
      } else {
        this.accService.seller.next(sel);
        localStorage.setItem('seller', JSON.stringify(sel));

        this.accService.loggedIn.next(true);
        this.router.navigate(['profile']);
      }
    });

  }

  passwordMatch() {
    if (!this.passwordConfirm.value) { return true; }
    return this.password.value === this.passwordConfirm.value;
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('minlength') ? 'Must have at least 8 characters' :
        this.password.hasError('maxlength') ? 'Maximum 25 of characters' :
          '';
  }

  getPasswordConfirmErrorMessage() {
    if (this.password.value === this.passwordConfirm.value) {
      this.passwordConfirm.validator = null;
    }
    return this.passwordConfirm.hasError('required') ? 'You must enter a value' :
      (this.password.value !== this.passwordConfirm.value) ? 'Password doesnt match' :
        '';
  }

}

