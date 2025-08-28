import axios from "axios";
import toast from "react-hot-toast";
import { AppDispatch } from "../store";
import { addTocart, revmoveToCart } from "../slices/cart-slice";

// add to cart
export const addItemsToCart =
  (product: any, quantity: number) =>
  async (dispatch: AppDispatch, getState: any) => {
    try {
      dispatch(addTocart({ product, quantity }));
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cart.cartItems)
      );
      toast.success("Item added to cart");
    } catch (error) {
      console.log(error);
    }
  };

// remove from cart
export const removeItemsToCart =
  (documentId: string) => async (dispatch: AppDispatch, getState: any) => {
    try {
      dispatch(revmoveToCart({ documentId }));
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cart.cartItems)
      );
      toast.success("Item removed to cart");
    } catch (error) {
      console.log(error);
    }
  };
