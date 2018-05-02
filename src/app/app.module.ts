// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatTabsModule } from '@angular/material';
import { MatGridListModule, MatFormFieldModule, MatInputModule, MatRadioModule } from '@angular/material';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';

// Routing
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { UpdateProfileComponent } from './components/account/update-profile/update-profile.component';
import { ViewOwedComponent } from './components/admin/view-owed/view-owed.component';
import { CartComponent } from './components/user/cart/cart.component';
import { CheckoutComponent } from './components/user/checkout/checkout.component';
import { BrowseProductsComponent } from './components/user/browse-products/browse-products.component';
import { ManageProductsComponent } from './components/seller/manage-products/manage-products.component';
import { ViewStoreOrdersComponent } from './components/seller/view-store-orders/view-store-orders.component';
import { FullfillOrderComponent } from './components/seller/fullfill-order/fullfill-order.component';
import { OrderHistoryComponent } from './components/customer/order-history/order-history.component';
import { ViewOrderComponent } from './components/customer/view-order/view-order.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';

// services

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UpdateProfileComponent,
    ViewOwedComponent,
    CartComponent,
    CheckoutComponent,
    BrowseProductsComponent,
    ManageProductsComponent,
    ViewStoreOrdersComponent,
    FullfillOrderComponent,
    OrderHistoryComponent,
    ViewOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    Ng2CloudinaryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
