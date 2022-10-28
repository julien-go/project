import {Fragment, useContext, useState, useEffect} from 'react'
import {AppContext} from '../reducer/reducer'
import {useLocation, useNavigate, NavLink} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from 'axios'

import Post from './Post'

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
                console.log(res.data)
                console.log(res.data.posts)
                if(res.data.response || res.data.posts !== []){
                        setPosts([...res.data.posts].sort(compareId));
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
    
    const refresh = () => {
        console.log('refresh')
        getLastPosts()
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
            
            {msg !== '' && <p>{msg}</p>}
            <div className='feed'>
                <h1>{thisCategory}</h1>
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
export default CategoryFeed;

