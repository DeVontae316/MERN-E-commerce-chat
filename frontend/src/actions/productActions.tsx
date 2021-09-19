import axios from "axios";
import {
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
} from "../constants/productsConstants";

export const getAllProducts =
  () => async (dispatch: any, getState: Function) => {
    try {
      dispatch({
        type: PRODUCTS_LIST_REQUEST,
      });

      const req = await axios.get("/api/products");

      if (req) {
        console.log("data below:");
        console.log(req);
        dispatch({
          type: PRODUCTS_LIST_SUCCESS,
          payload: req.data,
        });
      }
    } catch (error: any) {
      console.log(`Error:${error.message}`);
      dispatch({
        type: PRODUCTS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getProduct = (id: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/products/${id}`);

    if (data) {
      console.log("Product below:");
      console.log(data);
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(`Error:${error}`);
    dispatch({
      type: PRODUCT_LIST_FAIL,
    });
  }
};
