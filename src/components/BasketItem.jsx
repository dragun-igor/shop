import { useContext } from 'react';
import { ShopContext } from '../context';

function BasketItem(props) {
  const { id, name, price, quantity } = props;

  const {
    decreaseQuantity = Function.prototype,
    increaseQuantity = Function.prototype,
    removeBasketItem = Function.prototype,
  } = useContext(ShopContext);

  return (
    <li className="collection-item">
      {name}{' '}
      <i
        className="material-icons basket-quantity"
        onClick={() => decreaseQuantity(id)}
      >
        remove
      </i>
      {quantity}
      <i
        className="material-icons basket-quantity"
        onClick={() => increaseQuantity(id)}
      >
        add
      </i>{' '}
      ={price * quantity} ₽
      <span className="secondary-content" onClick={() => removeBasketItem(id)}>
        <i className="material-icons remove-basket-item">close</i>
      </span>
    </li>
  );
}

export { BasketItem };
