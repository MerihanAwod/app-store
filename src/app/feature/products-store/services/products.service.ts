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
import { Apollo, gql } from 'apollo-angular';
import { MOCK_DATA } from './mock-data';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Inject
  // private _httpClient: HttpClient = inject(HttpClient);
  private _apollo: Apollo = inject(Apollo);

  public getProducts(): Observable<any> {
    return of(MOCK_DATA.getProducts.data.getProducts);
    return this._apollo
      .query<{ getProducts: any }>({
        query: gql`
          query getProducts {
            getProducts {
              brand
              color
              collection {
                title
              }
              description
              id
              image
              inventory
              model
              price
              title
              slug
              rating
              promotion {
                discount
              }
              priceAfterDiscount
              popular
              onSale
            }
          }
        `,
      })
      .pipe(map((result) => result.data.getProducts));
  }

  public getProductDetails(productId: string): Observable<IProduct> {
    return this._apollo
      .query<{ getProduct: IProduct }>({
        query: gql`
          query getProduct($id: ID!) {
            getProduct(id: $id) {
              brand
              collection {
                title
              }
              color
              description
              id
              image
              onSale
              popular
              price
              priceAfterDiscount
              promotion {
                discount
              }
              rating
              slug
              title
            }
          }
        `,
        variables: { id: productId },
      })
      .pipe(map((result) => result.data.getProduct));
  }

  public getCategories(): Observable<any> {
    return of(MOCK_DATA.getCategories.data.getCollections);

    return this._apollo
      .query<{ getCollections: any }>({
        query: gql`
          query getCollections {
            getCollections {
              title
            }
          }
        `,
      })
      .pipe(map((result) => result.data.getCollections));
  }

  public getProductsByCategory(
    category: string
  ): Observable<IProductListResponse> {
    return this._apollo
      .query<{ getCollectionProducts: IProductListResponse }>({
        query: gql`
          query getCollectionProducts($title: String!) {
            getCollectionProducts(title: $title) {
              brand
              collection {
                title
              }
              color
              description
              id
              image
              inventory
              model
              onSale
              popular
              price
              priceAfterDiscount
              promotion {
                discount
              }
              rating
              slug
              title
            }
          }
        `,
        variables: {
          title: category,
        },
      })
      .pipe(map((result) => result.data.getCollectionProducts));
  }

  public addProduct(product: any): Observable<IAddProduct> {
    return this._apollo
      .mutate<{ addProduct: IAddProduct }>({
        mutation: gql`
          mutation addProduct(
            $title: String!
            $image: String!
            $price: Float!
            $description: String!
            $brand: String!
            $collectionTitle: String!
            $color: String!
            $inventory: Int!
            $model: String!
            $popular: Boolean!
            $rating: Float!
            $slug: String!
          ) {
            addProduct(
              title: $title
              image: $image
              price: $price
              description: $description
              brand: $brand
              collectionTitle: $collectionTitle
              color: $color
              inventory: $inventory
              model: $model
              popular: $popular
              rating: $rating
              slug: $slug
            ) {
              id
              brand
              collection {
                title
              }
              color
              title
              slug
              rating
              priceAfterDiscount
              price
              popular
              onSale
              model
              inventory
              image
              description
            }
          }
        `,
        variables: {
          title: product.title,
          image: product.image,
          price: product.price,
          description: product.description,
          brand: product.brand,
          collectionTitle: product.collectionTitle, // Fixed from "category"
          color: product.color,
          inventory: product.inventory,
          model: product.model,
          popular: product.popular,
          rating: product.rating,
          slug: product.slug,
        },
      })
      .pipe(map((result) => result.data!.addProduct));
  }

  public deleteProduct(payload: IDeleteProduct): Observable<IDeleteProduct> {
    return this._apollo
      .mutate<{ deleteProduct: IDeleteProduct }>({
        mutation: gql`
          mutation deleteProduct($id: Int!) {
            deleteProduct(id: $id) {
              id
            }
          }
        `,
        variables: {
          id: payload.id,
        },
      })
      .pipe(map((result) => result.data!.deleteProduct)); // Return the actual deleted product
  }

  public updateProduct(product: any): Observable<IProduct> {
    return this._apollo
      .mutate<{ updateProduct: IProduct }>({
        mutation: gql`
          mutation UpdateProduct(
            $id: ID!
            $title: String!
            $slug: String!
            $rating: Float!
            $price: Float!
            $popular: Boolean!
            $model: String!
            $inventory: Int!
            $image: String!
            $description: String!
            $color: String!
            $brand: String!
          ) {
            updateProduct(
              id: $id
              title: $title
              slug: $slug
              rating: $rating
              price: $price
              popular: $popular
              model: $model
              inventory: $inventory
              image: $image
              description: $description
              color: $color
              brand: $brand
            ) {
              id
              title
              slug
              rating
              price
              priceAfterDiscount
              popular
              onSale
              model
              inventory
              image
              description
              color
              brand
              collection {
                title
              }
              promotion {
                discount
              }
            }
          }
        `,
        variables: {
          id: product.id,
          title: product.title || 'Unknown Product', // Prevent empty strings
          slug:
            product.slug || product.title.replace(/\s+/g, '-').toLowerCase(),
          rating: product.rating ?? 0, // Ensure it's a number
          price: product.price ?? 0,
          popular: product.popular ?? false, // Ensure boolean type
          model: product.model || 'Unknown Model',
          inventory: product.inventory ?? 0,
          image: product.image || 'default-image.jpg',
          description: product.description || 'No description provided',
          color: product.color || 'Not specified',
          brand: product.brand || 'No Brand',
        },
      })
      .pipe(map((result) => result.data!.updateProduct));
  }
}
