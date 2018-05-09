import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Account } from '../../../models/account';
import { AccountsService } from '../../../services/accounts.service';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { Seller } from '../../../models/seller';
import { Customer } from '../../../models/customer';
import { CartService } from '../../../services/cart.service';


@Component({
  selector: 'app-access-account',
  templateUrl: './access-account.component.html',
  styleUrls: ['./access-account.component.css']
})

export class AccessAccountComponent implements OnInit {

  acc: Account = new Account();

  loading = false;
  invalid = false;
  notUnique = false;

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

  constructor(private cartService: CartService, private accService: AccountsService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('customer') != null && localStorage.getItem('seller') != null && localStorage.getItem('admin') != null) {
      this.router.navigate(['profile']);
    }
  }

  login() {
    this.loading = true;
    console.log('Attempting to log in');
    this.acc.accountId = 0;
    this.acc.roleId = 0;
    this.acc.username = this.username.value;
    this.acc.password = this.password.value;

    if (this.username.valid && this.password.valid) { // valid formats
      this.accService.accountLogin(this.acc).subscribe(accs => {

        if (accs == null) {
          this.invalid = true;
          this.loading = false;
          console.log('invalid username or password');
        } else {
          /*
            checks if the api call returns a seller, customer
            or admin and then addsto localstorage
          */
          const json = JSON.stringify(accs);
          if (json.substr(2, 8) === 'customer') {
            this.accService.customer.next(JSON.parse(json));
            localStorage.setItem('customer', json);
            localStorage.setItem('accType', 'customer');
            this.cartService.updateCartCount();
          } else if (json.substr(2, 6)  === 'seller') {
            console.log('added seller to local storage');
            localStorage.setItem('seller', json);
            localStorage.setItem('accType', 'seller');
          } else if (json.substr(2, 5) === 'admin') {
            this.accService.admin.next(JSON.parse(json));
            localStorage.setItem('admin', json);
            localStorage.setItem('accType', 'admin');
          }
          this.accService.loggedIn.next(true);
          this.router.navigate(['profile']);
        }
      });
    }
  }

  customerSignUp() {
    this.acc.accountId = 0;
    this.acc.roleId = 1;
    this.acc.username = this.username.value;
    this.acc.password = this.password.value;
    const customer: Customer = new Customer();

    customer.account = this.acc;
    customer.customerId = 0;
    customer.email = this.email.value;
    customer.firstName = this.firstName.value;
    customer.lastName = this.lastName.value;

    console.log('Attempting to sign up customer');
    if ( this.username.valid && this.password.valid && this.email.valid && this.firstName.valid && this.lastName.valid
      && this.passwordMatch() ) {
      this.accService.customerSignUp(this.acc, customer).subscribe(cus => {
        if (cus == null) {
          this.notUnique = true;
          console.log('username or email already exist');
        } else {
          this.accService.customer.next(cus);
          localStorage.setItem('customer', JSON.stringify(cus));

          this.router.navigate(['profile']);
        }
      });

    }


  }

  sellerSignUp() {
    this.acc.accountId = 0; // just has to be initialized can be any value
    this.acc.username = this.username.value;
    this.acc.password = this.password.value;
    this.acc.roleId = 2; // seller role id is 2
    const seller: Seller = new Seller();
    seller.account = this.acc;
    seller.address = this.streetAddress.value;
    seller.city = this.city.value;
    seller.email = this.email.value;
    seller.items = [];
    seller.name = this.sellerName.value;
    seller.sellerId = 0;
    seller.state = this.state.value;
    seller.zipcode = this.zipCode.value;

    console.log('Attempting to sign up seller');
    if (this.username.valid && this.password.valid && this.email.valid && this.sellerName.valid
      && this.streetAddress.valid && this.city.valid && this.state.valid && this.zipCode.valid && this.passwordMatch()) {
      this.accService.sellerSignUp(this.acc, seller).subscribe(sel => {
        if (sel == null) {
          this.notUnique = true;
          console.log('username or email already exist');
        } else {
          this.accService.seller.next(sel);
          localStorage.setItem('seller', JSON.stringify(sel));

          this.router.navigate(['profile']);
        }
      });
    }

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
