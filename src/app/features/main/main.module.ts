import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@NgModule({
  declarations: [MainLayoutComponent, HeaderComponent],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
