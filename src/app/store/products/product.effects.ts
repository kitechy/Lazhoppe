import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ProductActions from './product.actions';

import { ShopService } from 'src/app/features/main/product/shop.service';

import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),

      mergeMap(() =>
        this.shopService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),

          catchError((error) =>
            of(
              ProductActions.loadProductsFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private shopService: ShopService,
  ) {}
}
