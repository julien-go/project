import {Fragment, useContext, useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from 'axios'
import {AppContext} from '../reducer/reducer'

import Post from './Post'

const HallOfFame = () => {
    const [state, dispatch] = useContext(AppContext)
    const [posts, setPosts] = useState([])
    
    const getPosts = () => {
        axios.get(`${BASE_URL}/get-hall-of-fame`)
        .then((res)=> {
            console.log(res.data)
            if(res.data.response){
                setPosts([...res.data.posts].sort(compareScore))                
            }
        })
        .catch((err)=> {
            console.log(err)
        })
    }
      
    const refresh = () => {
        // e.preventDefault();
        getPosts();
    }
    
    const compareScore = (a, b) => {
        if(a.score < b.score) return 1
        if(a.score > b.score) return -1
        else return 0
    }
    
    useEffect(()=> {
       getPosts() 
    }, [])
    
  return (
      <Fragment>
        <div className='feed'>
            <h1>Hall of fame</h1>
            <div className='feed_action_bar'>
                <div className='refresh_container' >
                    <button onClick={()=> refresh} className='action_btn'  >Rafraichir la page</button>
                </div>
            </div>
              {posts.map((e, i)=> {
                    return (
                        <Post key={e.id} post={e} refresh={refresh}/>
                )
                })} 
                
            </div>
      </Fragment>
    )  
}

export default HallOfFame;