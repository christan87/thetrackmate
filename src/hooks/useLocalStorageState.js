import { useState, useEffect } from 'react';

function useLocalStorageState(key, defaultVal){
    //Make piece of state, based off value in localstorage
    const [state, setState] = useState(()=>{
        let val;
        try{
            val = JSON.parse(window.localStorage.getItem(key) || String(defaultVal));
        }catch(e){
            val = defaultVal;
        }
        return val;
    });
    //use useEffect to update localstorage when state canges
    useEffect(()=>{
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [state]);
    return [state, setState]
}

export default useLocalStorageState;