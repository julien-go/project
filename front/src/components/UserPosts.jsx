import {Fragment, useContext, useState, useEffect} from 'react'
import {AppContext} from '../reducer/reducer'
import {compareId} from '../utils/utils.js'
import {useLocation, NavLink} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from 'axios'

import Post from './Post'

const UserPosts = (props) => {
    
    const [state, dispatch] = useContext(AppContext)
    const [posts, setPosts] = useState([])
    
    
    const getPosts = () => {
        axios.get(`${BASE_URL}/get-user-posts/${props.username}`)
        .then((res)=>{
            res.data.response && setPosts([...res.data.posts].sort(compareId))
        })
        .catch((err)=> {
            console.log(err)
        })
    }
    
    useEffect(() => {
        getPosts();
    }, [props.username])
    
    const refresh = () => {
        getPosts();
    }
    
    
    return (
        <Fragment>
            <div className='feed'>
                <h2 className='bloc_title'>Posts</h2>
                {posts.map((e, i)=> {
                    return (
                        <Post key={e.id} post={e} refresh={refresh}/>
                    )
                })}
            </div>
        </Fragment>
    )
}

export default UserPosts;