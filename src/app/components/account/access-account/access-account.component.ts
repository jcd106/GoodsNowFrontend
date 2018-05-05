import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {FormControl, Validators, ValidatorFn, ValidationErrors} from '@angular/forms';


@Component({
  selector: 'app-access-account',
  templateUrl: './access-account.component.html',
  styleUrls: ['./access-account.component.css']
})
export class AccessAccountComponent implements OnInit {
  // account fields for customer seller and admin
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]);
  password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]);
  passwordConfirm = new FormControl('', [Validators.required]);

  // fields for admin and customer
  firstName = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  lastName = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);

  // fields for seller
  sellerName = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);

  streetAddress = new FormControl('', [Validators.required, Validators.minLength(3)]);
  city = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]);
  usStates = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii',
    'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands',
    'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska',
    'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  state = new FormControl('', [Validators.required]);
  zipCode = new FormControl('', [Validators.required, Validators.maxLength(5), Validators.minLength(5), Validators.pattern('^[0-9]*$')]);



  constructor() { }


  ngOnInit() {
  }

  login() {
    console.log('Attempting to log in');
  }

  customerSignUp() {
    console.log('Attempting to sign up customer');
  }

  sellerSignUp() {
    console.log('Attempting to sign up seller');
  }


  /*Error methods to display error messages for invalid input some other input validation is done in the
    html like the password match validation which works in junction with the passwordMatch Method
  */

  passwordMatch() {
    if (!this.passwordConfirm.value) { return true; }
    return this.password.value === this.passwordConfirm.value;
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' :
        this.username.hasError('minlength') ? 'Must have at least 5 characters' :
        this.username.hasError('maxlength') ? 'Maximum 16 of characters' :
            '';
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

  getFirstNameErrorMessage() {
    return this.firstName.hasError('required') ? 'You must enter a value' :
        this.firstName.hasError('minlength') ? 'Must have at least 2 characters' :
        this.firstName.hasError('maxlength') ? 'Maximum 50 of characters' :
            '';
  }

  getLastNameErrorMessage() {
    return this.lastName.hasError('required') ? 'You must enter a value' :
        this.lastName.hasError('minlength') ? 'Must have at least 2 characters' :
        this.lastName.hasError('maxlength') ? 'Maximum 50 of characters' :
            '';
  }

  getSellerNameErrorMessage() {
    return this.sellerName.hasError('required') ? 'You must enter a value' :
        this.sellerName.hasError('minlength') ? 'Must have at least 2 characters' :
        this.sellerName.hasError('maxlength') ? 'Maximum 50 of characters' :
            '';
  }

  getStreetAddressErrorMessage() {
    return this.streetAddress.hasError('required') ? 'You must enter a value' :
        this.streetAddress.hasError('minlength') ? 'Enter valid address' :
            '';
  }

  getCityErrorMessage() {
    return this.city.hasError('required') ? 'You must enter a value' :
        this.city.hasError('minlength') ? 'Not a city' :
        this.city.hasError('maxlength') ? 'Not a City' :
            '';
  }

  getZipCodeErrorMessage() {
    return this.zipCode.hasError('required') ? 'You must enter a value' :
        this.city.hasError('minlength') ? 'Must be a 5 digit zip code' :
        this.city.hasError('maxlength') ? 'Must be a 5 digit zip code' :
        this.city.hasError('pattern') ? 'Must be a number' :
          '';
  }

}
