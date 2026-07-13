import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyOrdersComponent],
  imports: [CommonModule, OrdersRoutingModule, FormsModule],
})
export class OrdersModule {}
