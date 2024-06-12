import { useContext } from "react";
import CartContex from "../store/CartContext";
import Modal from "./UI/Modal"
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

const Checkout = () => {
    const cartCtx = useContext(CartContex);
    const userProgressCtx = useContext(UserProgressContext)
    const cartTotal = cartCtx.items.reduce((totalPrice,item)=> {
        return totalPrice + item.price * item.quantity
    },0)

    const handleSubmit = (event) =>{
        
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        console.log(customerData);

        fetch('http://localhost:3000/orders',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                order:{
                    items:cartCtx.items,
                    customer:customerData
                }
            }),
        })
    }

    return <Modal open={userProgressCtx.process === 'checkout'}>
         <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input type='text' label='Full Name' id='name'/>
        <Input type='email' label='Email Address' id='email'/>
        <Input type='text' label='Street' id='street'/>
        <div className="control-row">
        <Input type='text' label='Postal Code' id='postal-code'/>
        <Input type='text' label='City' id='city'/>
        </div>
        <p className="modal-actions">
            <Button type='button' onClick={()=>userProgressCtx.hideCart()} textOnly={true}>Close</Button>
            <Button>Submit Order</Button>
        </p>
        </form>
    </Modal>
}
export default Checkout;