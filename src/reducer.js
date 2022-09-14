export function reducer(state, { type, payload }) {
  switch (type) {
    case 'ADD_TO_BASKET':
      let newOrder = null;
      const itemIndex = state.order.findIndex(
        (orderItem) => orderItem.id === payload.id
      );
      if (itemIndex < 0) {
        const newItem = {
          ...payload,
          quantity: 1,
        };
        newOrder = [...state.order, newItem];
      } else {
        newOrder = state.order.map((orderItem, index) => {
          if (index === itemIndex) {
            return {
              ...orderItem,
              quantity: orderItem.quantity + 1,
            };
          } else {
            return orderItem;
          }
        });
      }
      return {
        ...state,
        order: newOrder,
        alertName: payload.name,
      };
    case 'INCREASE_QUANTITY':
      const newOrder1 = state.order.map((orderItem) => {
        if (orderItem.id === payload.id) {
          const newQuantity = orderItem.quantity + 1;
          return {
            ...orderItem,
            quantity: newQuantity,
          };
        } else {
          return orderItem;
        }
      });

      return {
        ...state,
        order: newOrder1,
      };
    case 'DECREASE_QUANTITY':
      const newOrder2 = state.order.map((orderItem) => {
        if (orderItem.id === payload.id) {
          const newQuantity = orderItem.quantity - 1;
          return {
            ...orderItem,
            quantity: newQuantity >= 0 ? newQuantity : 0,
          };
        } else {
          return orderItem;
        }
      });

      return {
        ...state,
        order: newOrder2.filter((orderItem) => orderItem.quantity > 0),
      };
    case 'TOGGLE_BASKET':
      return {
        ...state,
        isBasketShow: !state.isBasketShow,
      };
    case 'REMOVE_BASKET_ITEM':
      return {
        ...state,
        order: state.order.filter((orderItem) => orderItem.id !== payload.id),
      };
    case 'CLOSE_ALERT':
      return {
        ...state,
        alertName: '',
      };
    case 'SET_GOODS':
      return {
        ...state,
        goods: payload || [],
        loading: false,
      };
    default:
      return state;
  }
}
