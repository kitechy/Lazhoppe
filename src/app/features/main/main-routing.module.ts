import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ApplyStoreComponent } from './store-owner/apply-store/apply-store.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { MyOrdersComponent } from '../orders/pages/my-orders/my-orders.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'shop', component: ProductListComponent },
      {
        path: 'shop/category/:category',
        component: ProductListComponent,
      },
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
      {
        path: 'auth',
        component: AuthComponent,
      },
      {
        path: 'apply-store',
        component: ApplyStoreComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent,
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('../../features/messages/messages.module').then(
            (m) => m.MessagesModule,
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'orders',
        component: MyOrdersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
