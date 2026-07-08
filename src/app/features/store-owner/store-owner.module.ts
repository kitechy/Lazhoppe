import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreOwnerRoutingModule } from './store-owner-routing.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateStoreComponent } from './pages/create-store/create-store.component';
import { ProductsComponent } from './pages/products/products.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { StoreOwnerLayoutComponent } from './layout/store-owner-layout/store-owner-layout.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from '../messages/messages.module';

@NgModule({
  declarations: [
    DashboardComponent,
    CreateStoreComponent,
    ProductsComponent,
    SidebarComponent,
    StoreOwnerLayoutComponent,
  ],
  imports: [
    CommonModule,
    StoreOwnerRoutingModule,
    GoogleMapsModule,
    FormsModule,
    MessagesModule,
  ],
})
export class StoreOwnerModule {}
