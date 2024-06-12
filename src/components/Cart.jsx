import { useContext } from "react";
import CartContext from '../store/CartContext';
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./Modal";
import Button from "./UI/Button";

const Cart = () => {
   const cartCtx = useContext(CartContext);
   const userProgressCtx = useContext(UserProgressContext)
   const totalPrice = cartCtx.items.reduce(( totalPrice,item) => {
    return totalPrice + item.quantity * item.price
},0)
    return <Modal className='cart' open={userProgressCtx.process === 'cart'} >
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map(item => {
                return <li key={item.id}>{item.name} - {item.quantity}</li>
            })}
        </ul>
        <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
        <p className="modal-actions">
        <Button onClick={()=> userProgressCtx.hideCart()} textOnly={true}>Close</Button>
        <Button onClick={()=> userProgressCtx.hideCart()} >Checkout order</Button>
        </p>
        
    </Modal>
} 

export default Cart;