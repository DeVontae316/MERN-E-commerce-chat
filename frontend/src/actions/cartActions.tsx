import { ADD_ITEM_TO_CART, DELETE_CART_ITEM } from "../constants/cartConstants";
import axios from "axios";

export const addItemToCart =
  (id: any, qty: number) => async (dispatch: Function, getState: Function) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);

      if (data) {
        dispatch({
          type: ADD_ITEM_TO_CART,
          payload: {
            ...data,
            qty,
          },
        });
        console.log("obj returned:");
        console.log(data);
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartReducer.cartItems)
      );
    } catch (error) {
      console.log(`error:${error}`);
    }
  };
/* (id: any, qty: number) => async (dispatch: any, getState: Function) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      if (data) {
        console.log("Item being added to cart");
        console.log(data);
        dispatch({
          type: ADD_ITEM_TO_CART,
          payload: { ...data, qty },
        });
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartReducer.cartItems)
      );
    } catch (error) {
      console.log(`error:${error}`);
    } 

  };*/

export const deleteCartItem =
  (id: any) => async (dispatch: any, getState: Function) => {
    dispatch({
      type: DELETE_CART_ITEM,
      payload: id,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartReducer.cartItems)
    );
  };
