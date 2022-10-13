import {Fragment, useContext, useState, useEffect} from 'react'
import {AppContext} from '../reducer/reducer'
import {useLocation, useNavigate, NavLink} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from 'axios'

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
                if(res.data.response){
                    if(res.data.posts !== []){
                        const postsToShow = res.data.posts
                        setPosts(postsToShow);
                        console.log(posts)
                        setMsg('')
                    } else {
                        setPosts([])
                        setMsg('No posts here !')
                    }
    
                }
            })
            .catch((err)=> {
                console.log(err)
            })
        }
    }
    
    useEffect(() => {
        getParams();
    }, [path])
    
    useEffect(()=> {
        getLastPosts()
    }, [thisCategory])

    return (
        <Fragment>
            <h2>{thisCategory}</h2>
            {msg !== '' && <p>{msg}</p>}
            <div className='feed'>
            {posts.map((e, i)=> {
                return(
                <div key={i} id={e.id} className='post'>
                    <div className="user_post">
                        <NavLink to={`/profile/${e.username}`}>
                            <p className='username'>{e.username}</p>
                        </NavLink>
                        <img src={`http://juliengodard.sites.3wa.io:9300/avatars/${e.avatar_url}`} alt={`${e.username}'s avatar`} className="little_avatar user_avatar "/>
                    </div>
                    <div>
                        <p>{e.text_content}</p>
                        <p className='score'>SCORE : {e.score}</p>
                        <p className='date'>{e.publication_date}</p>
                    </div>
                </div>
                )
            })}
            </div>
        </Fragment>
    )
}
export default CategoryFeed;
