import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './features/main/home/home.module';
import { ProductModule } from './features/main/product/product.module';
import { CartModule } from './features/main/cart/cart.module';
import { LoginComponent } from './features/main/auth/login/login.component';
import { RegisterComponent } from './features/main/auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { AuthComponent } from './features/main/auth/auth/auth.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from './store/products/product.reducer';
import { ProductEffects } from './store/products/product.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    ProductModule,
    CartModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      {
        products: productReducer,
      },
      {},
    ),
    EffectsModule.forRoot([ProductEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
