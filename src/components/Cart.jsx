import { useContext } from "react";
import CartContext from '../store/CartContext';
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartItem from "./CartItem";

const Cart = () => {
   const cartCtx = useContext(CartContext);
   const userProgressCtx = useContext(UserProgressContext)
   const totalPrice = cartCtx.items.reduce(( totalPrice,item) => {
    return totalPrice + item.quantity * item.price
},0)
    return <Modal className='cart' open={userProgressCtx.process === 'cart'} onClose={userProgressCtx.process === 'cart' ? ()=> userProgressCtx.hideCart() : null}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map(item => {
                return <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} onIncrese={()=>cartCtx.addItem(item)} onDecrease={()=>cartCtx.removeItem(item.id)}/>
            })}
        </ul>
        <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
        <p className="modal-actions">
        <Button onClick={()=> userProgressCtx.hideCart()} textOnly={true}>Close</Button>
        {cartCtx.items.length > 0 && <Button onClick={()=> userProgressCtx.showCheckout()} >Checkout order</Button> }
       
        </p>
        
    </Modal>
} 

export default Cart;