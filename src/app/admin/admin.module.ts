import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CustomFormsModule } from 'ng2-validation';
import { BrowserModule } from '@angular/platform-browser';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';
import { OrderDetailsComponent } from '../shopping/components/order-details/order-details.component';


@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService],
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService],
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService],
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService],
      },
      {
        path: 'admin/orders/:id',
        component: OrderDetailsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService],
      },
    ]),
  ],
  

  providers: [AdminAuthGuardService],
  
})

export class AdminModule {}

