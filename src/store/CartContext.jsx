import { createContext, useReducer } from "react";

export const CartContex = createContext({
    items:[],
    addItem:(item) => {},
    removeItem:(id) => {},

}) 

const cartReducer = (state,action) => {
    if(action.type === "ADD_ITEM"){
        const existingCartItemIndex = state.items.findIndex(item=>item.id === action.item.id);
        const updateItems = [...state.items]
        const existingItem = state.items[existingCartItemIndex];
        if(existingCartItemIndex > -1){
           const updateItem = {
            ...existingItem,
            quantity:existingItem.quantity + 1
           } 
           updateItems[existingCartItemIndex] = updateItem;
        }else{
            updateItems.push({...action.item,quantity:1})
        }

        return {...state ,items:updateItems }
    }
    if(action.type === "REMOVE_ITEM"){
        const existingCartItemIndex = state.items.findIndex(item=>item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updateItems = [...state.items];
        if(existingCartItem.quantity === 1){
        updateItems.splice(existingCartItemIndex,1)
        }else{
            const updateItem = {
                ...existingCartItem,
                quantity:existingCartItem.quantity-1
            }
            updateItems[existingCartItem] = updateItem;
        }
        return {...state ,items:updateItems }
    }

    return state;
}

export const CartContextProvider = ({children}) =>{
   const [cart,dispatch] = useReducer(cartReducer,{
     items:[],
    })

    const onAddItemHandler = (item) => {
        dispatch({type:'ADD_ITEM',item})
    }

    const onRemoveItemHandler = (id) => {
        dispatch({type:'ADD_ITEM',id})
    }


    const cartCtx = {
        items:cart.items,
        addItem:onAddItemHandler,
        removeItem:onRemoveItemHandler
    }

    console.log(cartCtx);

    return <CartContex.Provider value={cartCtx}>{children}</CartContex.Provider>
} 

export default CartContex;