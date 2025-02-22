import { IResponse } from '@store-app/core/models/interface/response.interface';

export interface IProductListResponse extends IResponse {
  products: Array<IProduct>;
}

export interface IProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color?: string;
  category: string;
  discount?: number;
  popular?: boolean;
  onSale?: boolean;
  rating?: IProductRating;
  quantity?: number;
}


export interface IAddProduct {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: IProductRating;
  index?: number;
}

export interface IProductRating {
  rate: number;
  count: number;
}

export interface IDeleteProduct {
  id?: number;
  index: number;
}

export interface ICategoryResponse extends IResponse {
  categories: Array<string>;
}
