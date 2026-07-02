import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './features/cart/cart.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { HomeModule } from './features/home/home.module';
import { ProductModule } from './features/product/product.module';
import { ProductListComponent } from './features/product-list/product-list.component';
import { AuthComponent } from './features/auth/auth/auth.component';

const routes: Routes = [
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
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, HomeModule, ProductModule],
})
export class AppRoutingModule {}
