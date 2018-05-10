import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { StepState } from '@covalent/core/steps';
import { Order } from '../../../models/order';
import { OrderItemId } from '../../../models/orderItemId';
import { CartItem } from '../../../models/cartItem';
import { OrderItem } from '../../../models/orderItem';
import { CheckoutService } from '../../../services/checkout.service';
import { AccountsService } from '../../../services/accounts.service';
import { Router } from '@angular/router';

declare let paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  addScript: Boolean = false;
  paypalLoad: Boolean = true;
  totalPrice: Number = 0;
  step1Active: Boolean = true;
  step2Active: Boolean = false;
  stateStep2: StepState = StepState.None;
  disabled1: Boolean = false;
  disabled2: Boolean = true;
  order: Order = new Order();
  cart: CartItem[] = new Array();
  succeeded: Boolean = false;
  failed: Boolean = false;
  customer: boolean = (localStorage.getItem('customer') !== null) ? true : false;
  loggedIn: boolean = (localStorage.getItem('accType') !== null) ? true : false;

  // PayPal Express Checkout stuff
  paypalConfig = {
    // leave this set to Sandbox
    env: 'sandbox',
    client: {
      sandbox: 'AQQ_h9TbADWcwA0hS1dVOkRMX9wtBj32T-RsOOpjUn5V0NYqMihrMmK-mGFaPslx2hX97zFP-JZgHj5m',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.totalPrice, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        // Do something when payment is successful.
        this.order.orderId = 0;
        this.order.customer = JSON.parse(localStorage.getItem('customer'));
        this.checkoutService.checkout(this.order).subscribe(order => {
          this.failed = false;
          this.succeeded = true;
          this.stateStep2 = StepState.Complete;
          this.disabled1 = true;
          this.disabled2 = true;
          this.cartService.updateCartCount();
        });
      });
    },
    onError: (err) => {
      /*
       * An error occurred during the transaction
       */
      this.failed = true;
      this.succeeded = false;
    }
  };
  // End of PayPal stuff

  constructor(private cartService: CartService, private checkoutService: CheckoutService,
    private accService: AccountsService, private router: Router) { }

  ngOnInit() {
    this.accService.getLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    this.accService.getCustomer().subscribe(customer => {
      this.customer = customer;
    });
    if (this.customer) {
      const customer = localStorage.getItem('customer');
      if (customer != null) {
        this.cartService.getCartItemsByCustomerId(JSON.parse(customer).customerId).subscribe(cart => {
          this.cart = cart;
          for (const cartItem of cart) {
            let totalPrice = this.totalPrice.valueOf();
            totalPrice += cartItem.cartItemId.item.price * cartItem.quantity;
            this.totalPrice = totalPrice;
          }
        });
      }
      // more PayPal Stuff

      if (!this.addScript) {
        this.addPaypalScript().then(() => {
          paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
          this.paypalLoad = false;
        });
      }
    } else if (!this.loggedIn) {
      this.router.navigate(['401']);
    } else {
      this.router.navigate(['403']);
    }
  }

  // even more PayPal
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

  redoShipping() {
    this.disabled2 = true;
    this.step1Active = true;
    this.step2Active = false;
  }

  addShipping() {
    this.disabled2 = false;
    this.step1Active = false;
    this.step2Active = true;
  }

}
