import { createContext, useState } from "react";

const UserProgressContext = createContext({
    process:'',
    showCart:()=>{},
    hideCart:()=>{},
    showCheckout:()=>{},
    hideCheckout:()=>{}
})

export const UserProgressContextProvider = ({children}) => {
    const [userProgress,setUserProgress] = useState('');
    const showCart = () => {
        setUserProgress('cart')
    }
    const hideCart = () => {
        setUserProgress('');
    }
    const showCheckout = () => {
        setUserProgress('checkout')
    }
    const hideCheckout = () => {
        setUserProgress(''); 
    }

    const progressCtx = {
        process:userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return <UserProgressContext.Provider value={progressCtx}>{children}</UserProgressContext.Provider>
}

export default UserProgressContext;