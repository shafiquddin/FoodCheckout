import { useContext } from "react";
import CartContex from "../store/CartContext";
import Modal from "./UI/Modal"
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from '../hooks/useHttp';
import Error from './UI/Error'

const configRequest = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
};

const Checkout = () => {
    const cartCtx = useContext(CartContex);
    const userProgressCtx = useContext(UserProgressContext)
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.price * item.quantity
    }, 0)

    const { data, error, isLoading: isSending,clearData, sendRequest } = useHttp('http://localhost:3000/orders', configRequest)

    const handleSubmit = (event) => {

        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }))
    }

    const handleClose = () => {
        userProgressCtx.hideCart()
    }

    const handleFinish = () => {
        userProgressCtx.hideCart();
        cartCtx.clearCart();
        clearData();
    }

    let actions = (
        <>
            <Button type='button' onClick={handleClose} textOnly={true}>Close</Button>
            <Button>Submit Order</Button>
        </>
    )

    if (isSending) {
        actions = <span>Sending Order data...</span>
    }

    if (data && !error) {
        return <Modal open={userProgressCtx.process === 'checkout'} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted succesfully.</p>
            <p>We will get back to you with more details via email with next few minutes.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>okay</Button>
            </p>
        </Modal>
    }

    return <Modal open={userProgressCtx.process === 'checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
            <Input type='text' label='Full Name' id='name' />
            <Input type='email' label='Email Address' id='email' />
            <Input type='text' label='Street' id='street' />
            <div className="control-row">
                <Input type='text' label='Postal Code' id='postal-code' />
                <Input type='text' label='City' id='city' />
            </div>
            {error && <Error title="Failed to Submit" message={error}></Error>}

            <p className="modal-actions">
                {actions}
            </p>
        </form>
    </Modal>
}
export default Checkout;