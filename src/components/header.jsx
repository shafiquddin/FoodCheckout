import { useContext } from 'react';
import logoImage from '../assets/logo.jpg'
import Button from './UI/Button';
import CartContex from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

const Header = () => {
    const cartCtx = useContext(CartContex);
    const progressCtx = useContext(UserProgressContext)
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems,item)=>{
        return totalNumberOfItems + item.quantity;
    },0)

    const handleShowCart = () => {
        progressCtx.showCart();
    }
    
    return <header id="main-header">
        <div id="title">
            <img src={logoImage} alt="logo" />
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button onClick={handleShowCart} textOnly={true}>Cart ({totalCartItems})</Button>
        </nav>
    </header>
}

export default Header;