import { createReducer, on } from '@ngrx/store';
import { INITIAL_PRODUCTS_STATE } from './product.state';
import { ProductsActions } from './product.action';
import { IProduct } from '../models/interfaces/product.interface';

export const ProductsReducer = createReducer(
  INITIAL_PRODUCTS_STATE,
  // <---- PRODUCTS LIST ---->
  on(ProductsActions.gET_PRODUCT_LIST_SUCCESS, (state, { payload }) => {
    return {
      ...state,
      list: payload,
      error: null,
    };
  }),
  on(ProductsActions.gET_PRODUCT_LIST_FAIL, (state, { error }) => {
    return {
      ...state,
      list: [],
      error: error,
    };
  }),

  // <---- PRODUCTS LIST BY CATEGORY ---->
  on(ProductsActions.gET_PRODUCTS_BY_CATEGORY, (state) => {
    return {
      ...state,
      list: null,
      error: null,
    };
  }),
  on(ProductsActions.gET_PRODUCTS_BY_CATEGORY_SUCCESS, (state, { payload }) => {
    return {
      ...state,
      list: payload,
      error: null,
    };
  }),
  on(ProductsActions.gET_PRODUCT_LIST_FAIL, (state, { error }) => {
    return {
      ...state,
      list: null,
      error: error,
    };
  }),

  // <---- PRODUCT DETAILS ---->
  on(ProductsActions.gET_PRODUCT, (state) => {
    return {
      ...state,
      productDetails: null,
      error: null,
    };
  }),
  on(ProductsActions.gET_PRODUCT_SUCCESS, (state, { payload }) => {
    return {
      ...state,
      productDetails: payload.productDetails,
      cachedProductDetails: new Map(payload.cachedProductDetails),
      error: null,
    };
  }),
  on(ProductsActions.gET_PRODUCT_FAIL, (state, { error }) => {
    return {
      ...state,
      productDetails: null,
      error: error,
    };
  }),

  // <---- CATEGORIES LIST ---->
  on(ProductsActions.gET_CATEGORY_LIST_SUCCESS, (state, { payload }) => {
    console.log('payload', payload);

    return {
      ...state,
      categories: [
        { title: 'all' },
        ...(Array.isArray(payload) ? payload : []),
      ],
      error: null,
    };
  }),
  on(ProductsActions.gET_CATEGORY_LIST_FAIL, (state, { error }) => {
    return {
      ...state,
      categories: [],
      error: error,
    };
  }),

  // <---- ADD PRODUCT ---->
  on(ProductsActions.aDD_PRODUCT_SUCCESS, (state, { payload }) => {
    return {
      ...state,
      list: [payload as IProduct, ...(state.list || [])],
      error: null,
    };
  }),
  on(ProductsActions.aDD_PRODUCT_FAIL, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),

  // <---- DELETE PRODUCT ---->
  on(ProductsActions.dELETE_PRODUCT_SUCCESS, (state, { payload }) => {
    let updatedList = state.list;

    // Remove by id if id is provided
    updatedList = (state.list || []).filter((product) => product?.id !== payload.id);

    return {
      ...state,
      list: [...(updatedList || [])],
      error: null,
    };
  }),
  on(ProductsActions.aDD_PRODUCT_FAIL, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),

  // <---- UPDATE PRODUCT ---->
  on(ProductsActions.uPDATE_PRODUCT_SUCCESS, (state, { payload }) => {
    // const { id, index } = payload;

    // let updatedList = state.list;

    // if (id) {
    //   // Update the product by id if provided
    //   updatedList = (state.list || []).map((product) =>
    //     product.id === id ? { ...product, ...payload } : product
    //   );
    // } else if (index !== undefined) {
    //   // Update the product by index if id is not provided
    //   updatedList = (state.list || []).map((product, i) =>
    //     i === index ? { ...product, ...payload } : product
    //   );
    // }

    return {
      ...state,
      // list: updatedList,
      // error: null,
    };
  }),
  on(ProductsActions.uPDATE_PRODUCT_FAIL, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  })
);
