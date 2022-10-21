import {Fragment, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import BASE_URL from "../config.js"
import HomeFeed from "./HomeFeed"

import {AppContext} from '../reducer/reducer'

const Home = () => {
     const navigate = useNavigate();
     const [state, dispatch] = useContext(AppContext)
     
     useEffect(()=> {
         state.username === "" && navigate('/login')
     },[])
    
    return (
        <Fragment>
            <h1>Home</h1>
            <HomeFeed />
        </Fragment>
        )
}

export default Home;