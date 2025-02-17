import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IAddProduct,
  ICategoryResponse,
  IDeleteProduct,
  IProduct,
  IProductListResponse,
} from '../models/interfaces/product.interface';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/production.environments';
import { map, of } from 'rxjs';
import { UrlQueryBuilder } from '@store-app/shared/utilis/url-query-builder';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Inject
  private _httpClient: HttpClient = inject(HttpClient);

  public getProducts(): Observable<IProductListResponse> {
    return this._httpClient
      .get<IProductListResponse>(environment.fakeStoreApi + `/products`)
      .pipe(
        map((m) => {
          return {
            ...m,
            products: m.products.map((product) => ({
              ...product,
              rating: {
                rate: parseFloat((Math.random() * (5 - 1) + 1).toFixed(1)),
                count: Math.floor(Math.random() * 5000) + 1,
              },
            })),
          };
        })
      );
  }

  public getProductDetails(productId: string): Observable<IProduct> {
    return this._httpClient.get<IProduct>(
      environment.fakeStoreApi + `/products/${productId}`
    );
  }

  public getCategories(): Observable<ICategoryResponse> {
    return this._httpClient.get<ICategoryResponse>(
      environment.fakeStoreApi + '/products/category'
    );
  }

  public getProductsByCategory(
    category: string
  ): Observable<IProductListResponse> {
    const urlQuery = UrlQueryBuilder.buildUrlQuery(
      environment.fakeStoreApi,
      '/products/category',
      {
        type: category,
      }
    );
    return this._httpClient.get<IProductListResponse>(urlQuery.toString());
  }

  public addProduct(product: IAddProduct): Observable<IAddProduct> {
    return this._httpClient.post<IAddProduct>(
      environment.fakeStoreApi + `/products`,
      product
    );
  }

  public deleteProduct(payload: IDeleteProduct): Observable<IDeleteProduct> {
    if (payload.id) {
      return this._httpClient
        .delete<Object>(environment.fakeStoreApi + `/products/${payload.id}`)
        .pipe(map(() => payload));
    } else {
      return of(payload);
    }
  }

  public updateProduct(product: IProduct): Observable<IProduct> {
    return this._httpClient
      .put<IAddProduct>(
        environment.fakeStoreApi + `/products/${product.id}`,
        product
      )
      .pipe(map(() => product));
  }
}
