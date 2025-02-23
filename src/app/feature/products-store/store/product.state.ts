import { IProduct } from '../models/interfaces/product.interface';

export interface IProductsState {
  list: Array<IProduct> | null;
  productDetails: IProduct | null;
  cachedProductDetails: Map<string, IProduct>;
  categories: Array<{ title: string }>;
  error: any;
}

export const INITIAL_PRODUCTS_STATE: IProductsState = {
  list: null,
  productDetails: null,
  cachedProductDetails: new Map(),
  categories: [],
  error: null,
};
