import { BasketItem } from './BasketItem';

function BasketList(props) {
  const {
    order,
    handleRemoveBasketItem,
    handleBasketShow = Function.prototype,
    incrementQuantity,
    decrementQuantity,
  } = props;

  const totalPrice = order.reduce((sum, orderItem) => {
    return sum + orderItem.price * orderItem.quantity;
  }, 0);

  return (
    <ul className="collection basket-list">
      <li className="collection-item active">Корзина</li>
      {order.length ? (
        order.map((item) => (
          <BasketItem
            key={item.id}
            {...item}
            handleRemoveBasketItem={handleRemoveBasketItem}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        ))
      ) : (
        <li className="collection-item">Корзина пуста</li>
      )}
      <li className="collection-item active">
        Общая стоимость: {totalPrice} ₽
        <button className="btn btn-small">Оформить</button>
      </li>
      <i className="material-icons basket-close" onClick={handleBasketShow}>
        close
      </i>
    </ul>
  );
}

export { BasketList };
