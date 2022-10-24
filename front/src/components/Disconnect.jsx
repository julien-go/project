import {useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {AppContext} from '../reducer/reducer'
import BASE_URL from "../config.js"
import axios from 'axios'

const Disconnect = () => {
    const [state, dispatch] = useContext(AppContext)
    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.removeItem('jwtToken')
        delete axios.defaults.headers.common['Authorization']
        dispatch({type:'LOGOUT'})
        navigate("/login", {replace: true})
    },[])
};


export default Disconnect;