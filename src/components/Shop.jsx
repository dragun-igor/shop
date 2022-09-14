import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../config';
import { BasketList } from './BasketList';
import { Cart } from './Cart';
import { GoodsList } from './GoodsList';
import { Preloader } from './Preloader';
import { Alert } from './Alert';

function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);
  const [alertName, setAlertName] = useState('');

  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });
      setOrder(newOrder);
    }
    setAlertName(item.name);
  };

  const incrementQuantity = (id) => {
    const newOrder = order.map((orderItem) => {
      if (orderItem.id === id) {
        const newQuantity = orderItem.quantity + 1;
        return {
          ...orderItem,
          quantity: newQuantity,
        };
      } else {
        return orderItem;
      }
    });
    setOrder(newOrder);
  };

  const decrementQuantity = (id) => {
    const newOrder = order.map((orderItem) => {
      if (orderItem.id === id) {
        const newQuantity = orderItem.quantity - 1;
        return { ...orderItem, quantity: newQuantity >= 0 ? newQuantity : 0 };
      } else {
        return orderItem;
      }
    });
    setOrder(newOrder.filter((orderItem) => orderItem.quantity > 0));
  };

  const handleRemoveBasketItem = (id) => {
    setOrder(order.filter((orderItem) => orderItem.id !== id));
  };

  const handleBasketShow = () => {
    setBasketShow(!isBasketShow);
  };

  const closeAlert = () => {
    setAlertName('');
  };

  useEffect(function getGoods() {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.featured && setGoods(data.featured);
        setLoading(false);
      });
  }, []);

  return (
    <main className="container content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {loading ? (
        <Preloader />
      ) : (
        <GoodsList goods={goods} addToBasket={addToBasket} />
      )}
      {isBasketShow && (
        <BasketList
          order={order}
          handleRemoveBasketItem={handleRemoveBasketItem}
          handleBasketShow={handleBasketShow}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
        />
      )}
      {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
    </main>
  );
}

export { Shop };
