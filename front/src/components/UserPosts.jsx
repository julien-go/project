import {Fragment, useContext, useState, useEffect} from 'react'
import {AppContext} from '../reducer/reducer'
import {compareId} from '../utils/utils.js'
import {useLocation, NavLink} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from 'axios'

import VoteBar from './VoteBar'
import DeletePost from './DeletePost'

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
                    <div key={i} id={e.id} className='post'>
                        <div className="post_header">
                            <NavLink className='post_user' to={`/profile/${e.username}`}>
                                <p className='username'>{e.username}</p>
                                <img src={`http://juliengodard.sites.3wa.io:9300/avatars/${e.avatar_url}`} alt={`${e.username}'s avatar`} className="little_avatar user_avatar "/>
                            </NavLink>
                            <ul className='post_categories'>
                                {posts[i].categories.map((element, j) => 
                                <li key={j} className='label_category'>{element.name}</li>
                                )}
                            </ul>
                        </div>
                        <div className='post_content'>
                            <p>{e.text_content}</p>
                            
                            {posts[i].image !== undefined && <img src={`http://juliengodard.sites.3wa.io:9300/img/${posts[i].image.url}`} alt={`${e.username}'s uploaded picture`} className="post_img"/>}
                        </div>
                            <div className='vote_bar'>
                                <VoteBar post_id={e.id} user_id={state.id} score={e.score}/>
                            </div>
                            <div className='date_container'>
                                <div className='date'>{e.publication_date}</div>
                            </div>
                            {(state.username === props.username || state.isAdmin) && 
                                <DeletePost postId={e.id} img={e.image} refresh={refresh}/>
                            }
                    </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

export default UserPosts;