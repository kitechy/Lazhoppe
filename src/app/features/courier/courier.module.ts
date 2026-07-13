import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourierRoutingModule } from './courier-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { HistoryComponent } from './pages/history/history.component';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    DashboardComponent,
    OrdersComponent,
    HistoryComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    CourierRoutingModule
  ]
})
export class CourierModule { }
