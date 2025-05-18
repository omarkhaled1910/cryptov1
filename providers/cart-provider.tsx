"use client";

import {
  getUpdatedCartFromLocalStorage,
  setUpdatedCartToLocalStorage,
} from "@/lib/utils";
import React, {
  useReducer,
  createContext,
  Dispatch,
  useMemo,
  useContext,
} from "react";
export const emptyCart = {
  cart: [],
  total: 0,
  totalCount: 0,
};
const CartContext = createContext<{
  state: any;
  dispatch: Dispatch<any>;
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  state: {},
  dispatch: () => {},
  open: false,
  setOpen: () => {},
});
const cartReducer = (state: any, action: any) => {
  let addedItem = action.payload;
  switch (action.type) {
    case "ADD_ITEM": {
      //check if the action id exists in the addedItems
      let existed_item = state.cart.find(
        (item: any) => addedItem.id === item.id
      );
      if (existed_item) {
        const newState = {
          cart: state.cart.map((item: any) => {
            if (item.id === addedItem.id)
              return { ...item, count: item.count + 1 };
            return item;
          }),
          total: state.total + Number(addedItem.price),
          totalCount: state.totalCount + 1,
        };
        setUpdatedCartToLocalStorage(newState);
        return newState;
      } else {
        //calculating the total
        let newTotal = state.total + Number(addedItem.price);
        const newState = {
          cart: [...state.cart, { ...addedItem, count: 1 }],
          total: newTotal,
          totalCount: state.totalCount + 1,
        };
        setUpdatedCartToLocalStorage(newState);

        return newState;
      }
    }

    case "REMOVE_ITEM": {
      const newState = {
        cart: state.cart
          .map((item: any) => {
            if (item.id === addedItem.id)
              if (item.count > 1) {
                return { ...item, count: item.count - 1 };
              } else return null;
            return item;
          })
          .filter(Boolean),
        total: state.total - Number(addedItem.price),
        totalCount: state.totalCount - 1,
      };
      setUpdatedCartToLocalStorage(newState);
      return newState;
    }
    case "REMOVE_All_SINGLE_ITEM": {
      const newState = {
        cart: state.cart
          .map((item: any) => {
            if (item.id === addedItem.id) return null;
            return item;
          })
          .filter(Boolean),
        total: state.total - Number(addedItem.price) * addedItem.count,
        totalCount: state.totalCount - addedItem.count,
      };
      setUpdatedCartToLocalStorage(newState);
      return newState;
    }
    case "REMOVE_All_ITEMS": {
      const newState = {
        cart: [],
        total: 0,
        totalCount: 0,
      };
      setUpdatedCartToLocalStorage(newState);

      return newState;
    }

    default:
      return state;
  }
};

export const CartProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const previousCart = getUpdatedCartFromLocalStorage();
  const [state, dispatch] = useReducer(cartReducer, previousCart);
  const [open, setOpen] = React.useState(false);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      open,
      setOpen,
    }),
    [state, open]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
};
