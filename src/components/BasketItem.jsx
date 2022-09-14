function BasketItem(props) {
  const {
    id,
    name,
    price,
    quantity,
    handleRemoveBasketItem = Function.prototype,
    incrementQuantity = Function.prototype,
    decrementQuantity = Function.prototype,
  } = props;
  return (
    <li className="collection-item">
      {name}{' '}
      <i
        className="material-icons basket-quantity"
        onClick={() => decrementQuantity(id)}
      >
        remove
      </i>
      {quantity}
      <i
        className="material-icons basket-quantity"
        onClick={() => incrementQuantity(id)}
      >
        add
      </i>{' '}
      ={price * quantity} ₽
      <span
        className="secondary-content"
        onClick={() => handleRemoveBasketItem(id)}
      >
        <i className="material-icons remove-basket-item">close</i>
      </span>
    </li>
  );
}

export { BasketItem };
