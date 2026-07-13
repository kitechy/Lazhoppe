import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'store-owner',
    loadChildren: () =>
      import('./features/store-owner/store-owner.module').then(
        (m) => m.StoreOwnerModule,
      ),
  },
  {
    path: 'courier',
    loadChildren: () =>
      import('./features/courier/courier.module').then((m) => m.CourierModule),
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./features/messages/messages.module').then(
        (m) => m.MessagesModule,
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./features/checkout/checkout.module').then(
        (m) => m.CheckoutModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
