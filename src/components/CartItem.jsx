import { currencyFormatter } from "../util/formatting"

const CartItem = ({name,quantity,price,onIncrese,onDecrease}) => {
    return <li className="cart-item">
        <p>
            {name} - {quantity} x {currencyFormatter.format(price)}
        </p>
        <p className="cart-item-actions">
            <button onClick={onDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrese}>+</button>
        </p>
    </li>
}

export default CartItem;