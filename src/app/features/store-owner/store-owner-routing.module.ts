import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreOwnerLayoutComponent } from './layout/store-owner-layout/store-owner-layout.component';
import { StoreOwnerGuard } from 'src/app/core/guards/store-owner.guard';
import { CreateStoreComponent } from './pages/create-store/create-store.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreOwnerRoutingModule {}
