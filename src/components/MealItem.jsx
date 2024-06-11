import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartContex from "../store/CartContext";

const MealItem = ({meal}) => { 
    const cartCtx = useContext(CartContex)
    const handleMealToCart = () => {
        cartCtx.addItem(meal)
    }
    return <li className="meal-item">
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
            <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                <p className="meal-item-description">{meal.description}</p>
            </div>
            <div className="meal-item-actions">
                <Button onClick={handleMealToCart}>Add to Cart</Button>
            </div>
        </article>
    </li>
}

export default MealItem;