import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../services/products.service';
import { ProductsActions } from './product.action';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { withLatestFrom } from 'rxjs/internal/operators/withLatestFrom';
import { map } from 'rxjs/internal/operators/map';
import { Store } from '@ngrx/store';
import { IAppState } from '@store-app/store/app.store';
import { CashedProductDetailsSelector } from './product.selector';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';

@Injectable()
export class ProductsEffects {
  // Injects
  private _actions$: Actions = inject(Actions);
  private _productsService: ProductsService = inject(ProductsService);
  private _store: Store<IAppState> = inject(Store);
  private _snackBar = inject(MatSnackBar);
  private _translateService = inject(TranslateService);

  // Get Products List
  getProductsList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProductsActions.gET_PRODUCT_LIST),
      switchMap(() =>
        this._productsService.getProducts().pipe(
          map((response) => {
            const updatedResponse = response.map(
              (product: { rating: number }) => ({
                ...product,
                reviews:
                  product.rating *
                  (Math.floor(Math.random() * (25 - 3 + 1)) + 3),
              })
            );

            return ProductsActions.gET_PRODUCT_LIST_SUCCESS({
              payload: updatedResponse,
            });
          }),
          catchError((error) => {
            this._genericError();
            return of(ProductsActions.gET_PRODUCT_LIST_FAIL({ error }));
          })
        )
      )
    )
  );

  // Get Products BY CATEGORY
  getProductsByCategory$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProductsActions.gET_PRODUCTS_BY_CATEGORY),
      switchMap((action) => {
        return this._productsService.getProductsByCategory(action.payload).pipe(
          switchMap((response) =>
            of(
              ProductsActions.gET_PRODUCTS_BY_CATEGORY_SUCCESS({
                payload: response.products,
              })
            )
          ),
          catchError((error) => {
            this._genericError();
            return of(ProductsActions.gET_PRODUCTS_BY_CATEGORY_FAIL({ error }));
          })
        );
      })
    )
  );

  // Get Product Details
  getProductDetails$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProductsActions.gET_PRODUCT),
      withLatestFrom(this._store.select(CashedProductDetailsSelector)),
      switchMap(([action, cachedDetails]) => {
        const cachedProduct = cachedDetails?.get(action.payload); // Check if product is cached
        if (cachedProduct) {
          // If cached, return success action with cached product without hitting the API
          return of(
            ProductsActions.gET_PRODUCT_SUCCESS({
              payload: {
                productDetails: cachedProduct,
                cachedProductDetails: cachedDetails,
              },
            })
          );
        } else {
          // If not cached, make API call
          return this._productsService.getProductDetails(action.payload).pipe(
            map((response) => {
              // Cache the newly fetched product details
              const cachedProductDetails = new Map(cachedDetails);
              cachedProductDetails.set(action.payload, response); // Store in cache
              return ProductsActions.gET_PRODUCT_SUCCESS({
                payload: {
                  productDetails: response,
                  cachedProductDetails: cachedProductDetails,
                },
              });
            }),
            catchError((error) => {
              return of(ProductsActions.gET_PRODUCT_FAIL({ error }));
            })
          );
        }
      })
    )
  );

  // Get Categories List
  getCategoriesList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProductsActions.gET_CATEGORY_LIST),
      switchMap((action) => {
        return this._productsService.getCategories().pipe(
          tap((t) => {
            console.log('RESPONSE FROM SERVIE', t);
          }),
          switchMap((response) =>
            of(
              ProductsActions.gET_CATEGORY_LIST_SUCCESS({
                payload: response,
              })
            )
          ),
          catchError((error) =>
            of(ProductsActions.gET_CATEGORY_LIST_FAIL({ error }))
          )
        );
      })
    )
  );

  // Add Product
  addProduct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProductsActions.aDD_PRODUCT),
      switchMap((action) => {
        return this._productsService.addProduct(action.payload).pipe(
          switchMap((response) => {
            this._snackBarMessage('product.addSuccess');
            return of(
              ProductsActions.aDD_PRODUCT_SUCCESS({ payload: response })
            );
          }),
          catchError((error) => {
            this._genericError();
            return of(ProductsActions.aDD_PRODUCT_FAIL({ error }));
          })
        );
      })
    )
  );

  // DELETE Product
  deleteProduct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProductsActions.dELETE_PRODUCT),
      switchMap((action) => {
        return this._productsService.deleteProduct(action.payload).pipe(
          switchMap((response) => {
            this._snackBarMessage('product.deleteSuccess');
            return of(
              ProductsActions.dELETE_PRODUCT_SUCCESS({
                payload: action.payload,
              })
            );
          }),
          catchError((error) => {
            this._genericError();
            return of(ProductsActions.dELETE_PRODUCT_FAIL({ error }));
          })
        );
      })
    )
  );

  // UPDATE Product
  updateProduct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProductsActions.uPDATE_PRODUCT),
      switchMap((action) => {
        return this._productsService.updateProduct(action.payload).pipe(
          switchMap((response) =>
            of(ProductsActions.uPDATE_PRODUCT_SUCCESS({ payload: response }))
          ),
          catchError((error) => {
            this._genericError();
            return of(ProductsActions.uPDATE_PRODUCT_FAIL({ error }));
          })
        );
      })
    )
  );
  private _snackBarMessage(message: string) {
    this._snackBar.open(this._translateService.instant(message), '', {
      duration: 3000,
    });
  }

  private _genericError() {
    this._snackBar.open(this._translateService.instant('error.generic'), '', {
      duration: 3000,
    });
  }
}
