// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { AccessAccountComponent } from './components/account/access-account/access-account.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { UpdateProfileComponent } from './components/account/update-profile/update-profile.component';
import { ViewOwedComponent } from './components/admin/view-owed/view-owed.component';
import { OrderHistoryComponent } from './components/customer/order-history/order-history.component';
import { ViewOrderComponent } from './components/customer/view-order/view-order.component';
import { FullfillOrderComponent } from './components/seller/fullfill-order/fullfill-order.component';
import { ViewStoreOrdersComponent } from './components/seller/view-store-orders/view-store-orders.component';
import { ManageProductsComponent } from './components/seller/manage-products/manage-products.component';
import { BrowseProductsComponent } from './components/user/browse-products/browse-products.component';
import { CartComponent } from './components/user/cart/cart.component';
import { CheckoutComponent } from './components/user/checkout/checkout.component';
import { AddProductComponent } from './components/seller/add-product/add-product.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: '404', component: NotFoundComponent},
  { path: 'access', component: AccessAccountComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/update', component: UpdateProfileComponent },
  { path: 'view', redirectTo: '404', pathMatch: 'full' },
  { path: 'view/owed', component: ViewOwedComponent },
  { path: 'view/order-history', component: OrderHistoryComponent },
  { path: 'view/order', redirectTo: '404', pathMatch: 'full'},
  { path: 'view/order/:id', component: ViewOrderComponent },
  { path: 'view/store/orders', component: ViewStoreOrdersComponent},
  { path: 'view/store/order', redirectTo: '404', pathMatch: 'full'},
  { path: 'view/seller/order', component: FullfillOrderComponent},
  { path: 'products', component: ManageProductsComponent},
  { path: 'products/add', component: AddProductComponent},
  { path: 'browse', component: BrowseProductsComponent},
  { path: 'cart', component: CartComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
