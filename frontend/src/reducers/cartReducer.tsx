import { convertToObject } from "typescript";
import { ADD_ITEM_TO_CART, DELETE_CART_ITEM } from "../constants/cartConstants";
const initialState = {
  cartItems: [],
};

export function cartReducer(state = initialState, action: any) {
  const { payload, type } = action;

  switch (type) {
    /* case ADD_ITEM_TO_CART:
      const cartItem = payload;

      const check: object | any = state.cartItems.find(
        (i: object | any) => i._id === cartItem._id
      );

      if (check) {
        return {
          ...state,
          cartItems: state.cartItems.map((item: object | any) =>
            item._id === check._id ? cartItem : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, cartItem],
        };
      } */
    case ADD_ITEM_TO_CART:
      const addedItem = payload;

      const isAddedItemInCart = state.cartItems.find(
        (item: any) => item._id === addedItem._id
      );
      const updatedCart = state.cartItems.map((item: any) =>
        item._id === addedItem._id ? addedItem : item
      );

      if (isAddedItemInCart) {
        return {
          ...state,
          cartItems: [...updatedCart],
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, addedItem],
        };
      }
    case DELETE_CART_ITEM:
      const id = payload;
      const newCart = state.cartItems.filter((item: any) => item._id !== id);
      return {
        ...state,
        cartItems: [...newCart],
      };
    default:
      return {
        ...state,
      };
  }
}
