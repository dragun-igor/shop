import { useEffect, useContext } from 'react';
import { API_URL, API_KEY } from '../config';
import { BasketList } from './BasketList';
import { Cart } from './Cart';
import { GoodsList } from './GoodsList';
import { Preloader } from './Preloader';
import { Alert } from './Alert';
import { ShopContext } from '../context';

function Shop() {
  const { loading, isBasketShow, alertName, setGoods } =
    useContext(ShopContext);

  useEffect(function getGoods() {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGoods(data.featured);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <main className="container content">
      <Cart />
      {loading ? <Preloader /> : <GoodsList />}
      {isBasketShow && <BasketList />}
      {alertName && <Alert />}
    </main>
  );
}

export { Shop };
