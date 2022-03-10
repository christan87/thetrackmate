import React from 'react';
import { useAuth } from '../contexts/AuthFirebaseContext';
import { useDemoAuth } from '../contexts/AuthDemoContext';
import CircularIndeterminate from './CircularIndeterminate'
import demoMessages from '../services/demoMessages';

function AuthLoader({ children }){
    const { loading } = useAuth();
    const { demoLoading } = useDemoAuth();
    
    return loading ? 
        <>
            <CircularIndeterminate /> 

        </>
        : 
        demoLoading ?
            <></>
            :
            children
}

export default AuthLoader;