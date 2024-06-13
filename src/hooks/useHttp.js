import { useCallback, useEffect, useState } from "react";

const sendHttpRequest = async (url,config) => {
    const response = await fetch(url,config);
    const resData = await response.json();
    if(!response.ok){
        throw new Error(resData.message || 'something went wrong, failed to send request.')
    }
    return resData;
}

const useHttp = (url,config,initialState) => {
    const [error,setError] = useState();
    const [data,setData] = useState(initialState);
    const [isLoading,setIsLoading] = useState();

    const clearData = () => {
        setData(initialState);
    }

    const sendRequest = useCallback(async(data)=>{
        setIsLoading(true);
        try{
            const resData = await sendHttpRequest(url,{...config,body:data});
            setData(resData);
        }catch(error){
            setError(error.message || 'somthing went wrong!')
        }
        setIsLoading(false);
    },[url,config])

    useEffect(()=>{
        if((config && (config.method === "GET" || !config.method)) || !config){
            sendRequest();
        }
    },[sendRequest,config])

    return{
        error,
        data,
        isLoading,
        sendRequest,
        clearData
    }
}

export default useHttp;