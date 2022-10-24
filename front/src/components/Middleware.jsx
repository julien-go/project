import React from 'react';
import {useContext, useEffect, Fragment, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../reducer/reducer.js";
import { userPath, adminPath, notConnectedPath } from '../config/path.js'

const Middleware = ({children}) => {
    const [state, dispatch] = useContext(AppContext)
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    
    const location = useLocation()
    const currentPath = location.pathname
    
    useEffect(() =>  {
        setShow(true)
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
            if(state.username !== ''){
                console.log(state.username)
                navigate('/', {replace: true})
            }
        }
        
    }, [currentPath, state.username])
    
    return(
        <Fragment>
            {show && children}
        </Fragment>
        )
}

export default Middleware;
