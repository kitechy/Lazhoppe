import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { ApplyStoreComponent } from './store-owner/apply-store/apply-store.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainLayoutComponent, HeaderComponent, ApplyStoreComponent],
  imports: [CommonModule, MainRoutingModule, FormsModule],
})
export class MainModule {}
