import {Fragment, useContext, useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import {AppContext} from '../reducer/reducer'
import BASE_URL from "../config.js"
import axios from 'axios'

import Post from './Post'

import { GiPodium } from "react-icons/gi";

const HomeFeed = () => {
    const [state, dispatch] = useContext(AppContext)
    const [posts, setPosts] = useState([])
    const [msg, setMsg] = useState('')
    
    const getPosts = () => {
        // On envoie un requête à l'api qui récupère tout les posts
            axios.get(`${BASE_URL}/get-homefeed/${state.id}`)
            .then((res)=> {
                if(res.data.response){
                    setMsg('')
                    
                    setPosts(res.data.posts.sort(compareId))
                } else {
                    setMsg('No posts here, follow categories to get a feed')
                }
            })
            .catch((err)=> {
                console.log(err)
            })
    }
    
    const refresh = () => {
        getPosts()
    }
    
    const compareId = (a, b) => {
        // On compare l'id des posts pour les classer dans l'ordre du plus récent au plus ancien
        if(a.id < b.id) return 1
        if(a.id > b.id) return -1
        else return 0
    }

    useEffect(() => {
            getPosts();
    }, [])
    
    
    return (
        <Fragment>

            <div className='feed'>
                <h1>ACCUEIL</h1>
                <div className='feed_action_bar'>
                    <div className='refresh_container' >
                            <button onClick={()=> refresh} className='action_btn' >Rafraîchir la page</button>
                    </div>
                    <div>
                        <NavLink to='/hall-of-fame'>
                            <button className='action_btn hall_of_fame_btn'>
                                <GiPodium/>
                                 <p>Hall Of Fame</p>
                            </button>
                        </NavLink>
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
export default HomeFeed;

