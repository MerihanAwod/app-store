import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  IAddProduct,
  IDeleteProduct,
  IProduct,
} from '../models/interfaces/product.interface';
import { IPagination } from '../models/interfaces/pagination.interface';

export enum ProductsActionEnum {
  MAIN = 'products',
  // PRODUCTS
  GET_PRODUCT_LIST = 'GET_PRODUCT_LIST',
  GET_PRODUCT_LIST_SUCCESS = 'GET_PRODUCT_LIST_SUCCESS',
  GET_PRODUCT_LIST_FAIL = 'GET_PRODUCT_LIST_FAIL',

  // PRODUCT DETAILS
  GET_PRODUCT = 'GET_PRODUCT',
  GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS',
  GET_PRODUCT_FAIL = 'GET_PRODUCT_FAIL',

  // CATEGORY LIST
  GET_CATEGORY_LIST = 'GET_CATEGORY_LIST',
  GET_CATEGORY_LIST_SUCCESS = 'GET_CATEGORY_LIST_SUCCESS',
  GET_CATEGORY_LIST_FAIL = 'GET_CATEGORY_LIST_FAIL',

  // GET PRODUCTS BY CATEGORY
  GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY',
  GET_PRODUCTS_BY_CATEGORY_SUCCESS = 'GET_PRODUCTS_BY_CATEGORY_SUCCESS',
  GET_PRODUCTS_BY_CATEGORY_FAIL = 'GET_PRODUCTS_BY_CATEGORY_FAIL',

  // ADD PRODUCTS
  ADD_PRODUCT = 'ADD_PRODUCT',
  ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS',
  ADD_PRODUCT_FAIL = 'ADD_PRODUCT_FAIL',

  // UPDATE PRODUCTS
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS',
  UPDATE_PRODUCT_FAIL = 'UPDATE_PRODUCT_FAIL',

  // DELETE PRODUCTS
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS',
  DELETE_PRODUCT_FAIL = 'DELETE_PRODUCT_FAIL',
}

export const ProductsActions = createActionGroup({
  source: ProductsActionEnum.MAIN,
  events: {
    // GET LIST
    [ProductsActionEnum.GET_PRODUCT_LIST]: emptyProps(),
    [ProductsActionEnum.GET_PRODUCT_LIST_SUCCESS]: props<{
      payload: Array<IProduct>;
    }>(),
    [ProductsActionEnum.GET_PRODUCT_LIST_FAIL]: props<{
      error?: HttpErrorResponse;
    }>(),

    //  PRODUCT Details
    [ProductsActionEnum.GET_PRODUCT]: props<{
      payload: string;
    }>(),
    [ProductsActionEnum.GET_PRODUCT_SUCCESS]: props<{
      payload: {
        productDetails: IProduct;
        cachedProductDetails: Map<string, IProduct>;
      };
    }>(),
    [ProductsActionEnum.GET_PRODUCT_FAIL]: props<{
      error?: HttpErrorResponse;
    }>(),

    // CATEGORY LIST
    [ProductsActionEnum.GET_CATEGORY_LIST]: emptyProps(),
    [ProductsActionEnum.GET_CATEGORY_LIST_SUCCESS]: props<{
      payload: Array<{ title: string }>;
    }>(),
    [ProductsActionEnum.GET_CATEGORY_LIST_FAIL]: props<{
      error?: HttpErrorResponse;
    }>(),

    // GET PRODUCTS BY CATEGORY
    [ProductsActionEnum.GET_PRODUCTS_BY_CATEGORY]: props<{
      payload: string;
    }>(),
    [ProductsActionEnum.GET_PRODUCTS_BY_CATEGORY_SUCCESS]: props<{
      payload: Array<IProduct>;
    }>(),
    [ProductsActionEnum.GET_PRODUCTS_BY_CATEGORY_FAIL]: props<{
      error?: HttpErrorResponse;
    }>(),

    // ADD PRODUCT
    [ProductsActionEnum.ADD_PRODUCT]: props<{
      payload: IAddProduct;
    }>(),
    [ProductsActionEnum.ADD_PRODUCT_SUCCESS]: props<{
      payload: IAddProduct;
    }>(),
    [ProductsActionEnum.ADD_PRODUCT_FAIL]: props<{
      error?: HttpErrorResponse;
    }>(),

    // UPDATE PRODUCT
    [ProductsActionEnum.UPDATE_PRODUCT]: props<{
      payload: IProduct;
    }>(),
    [ProductsActionEnum.UPDATE_PRODUCT_SUCCESS]: props<{
      payload: IProduct;
    }>(),
    [ProductsActionEnum.UPDATE_PRODUCT_FAIL]: props<{
      error?: HttpErrorResponse;
    }>(),

    // DELETE PRODUCT
    [ProductsActionEnum.DELETE_PRODUCT]: props<{
      payload: IDeleteProduct;
    }>(),
    [ProductsActionEnum.DELETE_PRODUCT_SUCCESS]: props<{
      payload: IDeleteProduct;
    }>(),
    [ProductsActionEnum.DELETE_PRODUCT_FAIL]: props<{
      error?: HttpErrorResponse;
    }>(),
  },
});
