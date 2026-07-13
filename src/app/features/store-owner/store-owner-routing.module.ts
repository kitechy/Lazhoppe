import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreOwnerLayoutComponent } from './layout/store-owner-layout/store-owner-layout.component';
import { StoreOwnerGuard } from 'src/app/core/guards/store-owner.guard';
import { CreateStoreComponent } from './pages/create-store/create-store.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: StoreOwnerLayoutComponent,
    // canActivate: [StoreOwnerGuard],
    children: [
      {
        path: '',
        redirectTo: 'setup-store',
        pathMatch: 'full',
      },
      {
        path: 'setup-store',
        component: CreateStoreComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('../../features/messages/messages.module').then(
            (m) => m.MessagesModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreOwnerRoutingModule {}
