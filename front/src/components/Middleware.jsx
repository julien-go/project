import React from 'react';
import {useContext, useEffect, Fragment} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../reducer/reducer.js";
import { userPath, adminPath, notConnectedPath } from '../config/path.js'

const Middleware = ({children}) => {
    const [state, dispatch] = useContext(AppContext)
    const navigate = useNavigate();
    
    const location = useLocation()
    const currentPath = location.pathname
    
    useEffect(() =>  {
        if (userPath.includes(currentPath)){
            if(!state.isLogged){
                navigate('/login', {replace: true})
            }
        }
        
        if (adminPath.includes(currentPath)){
            if(!state.isAdmin){
                navigate('/', {replace: true})
            }
        }
        
        if (notConnectedPath.includes(currentPath)){
            if(!state.username === ''){
                navigate('/', {replace: true})
            }
        }
        
    }, [currentPath])
    
    return(
        <Fragment>
            {children}
        </Fragment>
        )
}

export default Middleware;
