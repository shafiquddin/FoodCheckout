import { createContext, useReducer } from "react";

export const CartContex = createContext({
    items:[],
    addItem:(item) => {},
    removeItem:(id) => {},
    clearCart:()=>{}

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
        const updateItems = [...state.items]
        const existingItem = state.items[existingCartItemIndex];
        if(existingItem.quantity === 1){
        updateItems.splice(existingCartItemIndex,1)
        }else{
            const updateItem = {
                ...existingItem,
                quantity:existingItem.quantity - 1
            }
            updateItems[existingCartItemIndex] = updateItem;
        }
        return {...state ,items:updateItems }
    }

    if(action.type === "CLEAR"){
        return {...state,items:[]}
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
        dispatch({type:'REMOVE_ITEM',id})
    }
    const onClearItemHandler = (id) => {
        dispatch({type:'CLEAR'})
    }


    const cartCtx = {
        items:cart.items,
        addItem:onAddItemHandler,
        removeItem:onRemoveItemHandler,
        clearCart:onClearItemHandler
    }

    return <CartContex.Provider value={cartCtx}>{children}</CartContex.Provider>
} 

export default CartContex;