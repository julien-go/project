import {Fragment, useContext, useState, useEffect} from 'react'
import {AppContext} from '../reducer/reducer'
import {useLocation, useNavigate, NavLink} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from 'axios'

import VoteBar from './VoteBar'

const CategoryFeed = () => {
    const [state, dispatch] = useContext(AppContext);
    const [thisCategory, setThisCategory] = useState('')
    const [posts, setPosts] = useState([])
    const [msg, setMsg] = useState([])
    
    const path = useLocation();
    
    const getParams = () => {
        const pathTable = path.pathname.split('/');
        const name = pathTable[pathTable.length-1];
        setThisCategory(name);
    }
    
    const getLastPosts = () => {
        if(thisCategory !== '' && thisCategory !== undefined){
            axios.get(`${BASE_URL}/get-categoryfeed/${thisCategory}`)
            .then((res)=> {
                // console.log(res)
                // console.log(res.data.posts)
                if(res.data.response || res.data.posts !== []){
                        const postsToShow = res.data.posts
                        setPosts([...postsToShow].sort(compareId));
                        // console.log(posts)
                        setMsg('')
                        
                } else {
                        setPosts([])
                        setMsg('No posts here !')
                }
            
            })
            .catch((err)=> {
                setMsg('No posts here !')
                console.log(err)
            })
        }
    }
    
    const refresh = (e) => {
        e.preventDefault();
        console.log('refresh')
        getParams()
    }
    
    const compareId = (a, b) => {
        if(a.id < b.id) return 1
        if(a.id > b.id) return -1
        else return 0
    }
    
    useEffect(() => {
        getParams();
    }, [])
    
    useEffect(()=> {
        if(thisCategory !== ''){
            getLastPosts()
        }
    }, [thisCategory])

    return (
        <Fragment>
            <h1>{thisCategory}</h1>
            {msg !== '' && <p>{msg}</p>}
            <div className='feed'>
                <form className='refresh_container' onSubmit={e => refresh(e)}>
                    <input className='action_btn' type='submit' value='Rafraichir la page'/>
                </form>
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
                </div>
                )
            })}
            </div>
        </Fragment>
    )
}
export default CategoryFeed;
