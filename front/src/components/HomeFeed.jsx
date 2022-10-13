import {Fragment, useContext, useState, useEffect} from 'react'
import {AppContext} from '../reducer/reducer'
import BASE_URL from "../config.js"
import axios from 'axios'

const HomeFeed = () => {
    const [state, dispatch] = useContext(AppContext)
    
    const [posts, setPosts] = useState([])
    
    // const getLastPosts = () => {
        
    //     axios.get(`${BASE_URL}/get-homefeed/${state.id}`)
    //     .then((res)=> {
    //         if(res.data.response){
                
    //         }
    //     })
    //     .catch((err)=> {
    //         console.log(err)
    //     })
    // }
    
    // useEffect(() => {
    //     getLastPosts();
    // }, [])
    
    return (
        <Fragment>
        
        </Fragment>
    )
}
export default HomeFeed;