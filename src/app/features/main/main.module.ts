import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { ApplyStoreComponent } from './store-owner/apply-store/apply-store.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { MessagesModule } from '../messages/messages.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    ApplyStoreComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    GoogleMapsModule,
    MessagesModule,
  ],
})
export class MainModule {}
