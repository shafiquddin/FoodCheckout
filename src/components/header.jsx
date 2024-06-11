import { useContext } from 'react';
import logoImage from '../assets/logo.jpg'
import Button from './UI/Button';
import CartContex from '../store/CartContext';

const Header = () => {
    const cartCtx = useContext(CartContex);
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems,item)=>{
        return totalNumberOfItems + item.quantity;
    },0)
    return <header id="main-header">
        <div id="title">
            <img src={logoImage} alt="logo" />
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button textOnly={true}>Cart ({totalCartItems})</Button>
        </nav>
    </header>
}

export default Header;