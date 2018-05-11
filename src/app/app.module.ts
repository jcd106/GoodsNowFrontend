// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatTabsModule, MatIconModule } from '@angular/material';
import { MatGridListModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatFormField} from '@angular/material';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule} from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { CovalentStepsModule  } from '@covalent/core/steps';

// Routing
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
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
import { AccessAccountComponent } from './components/account/access-account/access-account.component';
import { AddProductComponent } from './components/seller/add-product/add-product.component';

// services
import { ProductsService } from './services/products.service';
import { AccountsService } from './services/accounts.service';
import { CartService } from './services/cart.service';
import { CheckoutService } from './services/checkout.service';
import { AdminService } from './services/admin.service';
import { UnauthorizedComponent } from './components/error/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './components/error/forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NavComponent,
    AccessAccountComponent,
    ProfileComponent,
    UpdateProfileComponent,
    ViewOwedComponent,
    CartComponent,
    CheckoutComponent,
    BrowseProductsComponent,
    ManageProductsComponent,
    AddProductComponent,
    ViewStoreOrdersComponent,
    FullfillOrderComponent,
    OrderHistoryComponent,
    ViewOrderComponent,
    UnauthorizedComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatTabsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    Ng2CloudinaryModule,
    CovalentStepsModule,
    FileUploadModule,
    ReactiveFormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSelectModule,
    FileUploadModule,
    HttpClientModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDialogModule,
    MatStepperModule

  ],
  providers: [
    ProductsService,
    AccountsService,
    CartService,
    CheckoutService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
