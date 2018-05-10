import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../models/cartItem';
import { CartService } from '../../../services/cart.service';
declare let paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItem: CartItem[] = new Array();
  totalPrice: Number = 0;
  addScript: Boolean = false;
  paypalLoad: Boolean = true;


  // PayPal Express Checkout stuff
  paypalConfig = {
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
      });
    },
    onError: (err) => {
      /*
       * An error occurred during the transaction
       */
      console.log('Error with PayPal.');
    }
  };
  // End of PayPal stuff

  constructor(private cartService: CartService) {}

  ngOnInit() {
    const customer = localStorage.getItem('customer');
    if (customer != null) {
      this.cartService.getCartItemsByCustomerId(JSON.parse(customer).customerId).subscribe(cart => {
        this.cartItem = cart;
        for (const cartItem of this.cartItem) {
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
  }

  updateCartItem(item: CartItem) {}

  deleteCartItem(item: CartItem) {
    console.log('Delete');
    this.cartService.deleteCartItem(item).subscribe(cartItem => {
      const customer = localStorage.getItem('customer');
      if (customer != null) {
        this.cartService.getCartItemsByCustomerId(JSON.parse(customer).customerId).subscribe(cart => {
          this.cartItem = cart;
          this.totalPrice = 0;
          for (const cartItem of this.cartItem) {
            let totalPrice = this.totalPrice.valueOf();
            totalPrice += cartItem.cartItemId.item.price * cartItem.quantity;
            this.totalPrice = totalPrice;
          }
          this.cartService.updateCartCount();
        });
      }
    });
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
}
