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
        // On récupère le nom de la catégorie dans l'url
        const pathTable = path.pathname.split('/');
        const name = pathTable[pathTable.length-1];
        setThisCategory(name);
    }
    
    const getLastPosts = () => {
        // On envoie une requête à l'api qui récupère tout les posts liés à cette catégorie
        if(thisCategory !== '' && thisCategory !== undefined){
            axios.get(`${BASE_URL}/get-categoryfeed/${thisCategory}`)
            .then((res)=> {
                
                if(res.data.response || res.data.posts !== []){
                        setPosts([...res.data.posts].sort(compareId));
                        setMsg('')
                } else {
                        setPosts([])
                        setMsg('Pas de posts ici :)')
                }
            })
            .catch((err)=> {
                console.log(err)
            })
        }
    }
    
    const refresh = () => {
        getLastPosts()
    }
    
    const compareId = (a, b) => {
        // On compare l'id des posts pour les classer dans l'ordre du plus récent au plus ancien
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

