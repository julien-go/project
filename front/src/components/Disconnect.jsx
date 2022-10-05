import {useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {AppContext} from '../reducer/reducer'
import BASE_URL from "../config.js"
import axios from 'axios'

const Disconnect = () => {
    const [state, dispatch] = useContext(AppContext)
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch({type:'LOGOUT'})
        axios.get(`${BASE_URL}/disconnect`)
            .then((res)=>{
            // console.log(res)
             res.data.response && navigate("/", {replace: true})
            })
            .catch((err) => {
            console.log(err)
            })
            
    },[])
};


export default Disconnect;