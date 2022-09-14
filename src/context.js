import { createContext, useReducer } from 'react';
import { reducer } from './reducer';

export const ShopContext = createContext();

const initialState = {
  goods: [],
  loading: true,
  order: [],
  isBasketShow: false,
  alertName: '',
};

export const ContextProvider = ({ children }) => {
  const [value, dispatch] = useReducer(reducer, initialState);

  value.closeAlert = () => {
    dispatch({ type: 'CLOSE_ALERT' });
  };

  value.removeBasketItem = (id) => {
    dispatch({ type: 'REMOVE_BASKET_ITEM', payload: { id: id } });
  };

  value.handleBasketShow = () => {
    dispatch({ type: 'TOGGLE_BASKET' });
  };

  value.decreaseQuantity = (id) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: { id: id } });
  };

  value.increaseQuantity = (id) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: { id: id } });
  };

  value.addToBasket = (item) => {
    dispatch({ type: 'ADD_TO_BASKET', payload: item });
  };

  value.setGoods = (data) => {
    dispatch({ type: 'SET_GOODS', payload: data });
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
