import {
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
} from "../constants/productsConstants";
const products = {
  products: [],
};

const product = {
  product: {},
};

export const productsReducer = (state = products, action: any) => {
  const { payload, type } = action;
  switch (type) {
    case PRODUCTS_LIST_REQUEST:
      return { ...state, products: [], loading: true };
    case PRODUCTS_LIST_SUCCESS:
      return { ...state, products: [...payload], loading: false };
    case PRODUCTS_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return { ...state };
  }
};
export const productReducer = (state = product, action: any) => {
  const { payload, type } = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, product: {}, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, product: { ...payload }, loading: false };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return { ...state };
  }
};
