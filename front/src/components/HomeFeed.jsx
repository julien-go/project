import {Fragment, useContext, useState, useEffect} from 'react'
import {useLocation, useNavigate, NavLink} from 'react-router-dom'
import {AppContext} from '../reducer/reducer'
import BASE_URL from "../config.js"
import axios from 'axios'

const HomeFeed = () => {
    const [state, dispatch] = useContext(AppContext)
    const [postsId, setPostsId] = useState([])
    const [posts, setPosts] = useState([])
    
    const getPostsId = () => {
        if(state.id !== null){
            axios.get(`${BASE_URL}/get-homefeed/${state.id}`)
            .then((res)=> {
                if(res.data.response){
                    // console.log(res.data)
                    setPostsId(res.data.postsId)
                    getPosts()
                }
            })
            .catch((err)=> {
                console.log(err)
            })
            .then((res)=>{
            })
        }
    }
    
    // Recuperation des infos de chaque posts dans la bdd
    const getPosts = () => {
        let idList = [];
        let postsToShow = [...posts];
        postsId.map((e, i) => {
            axios.get(`${BASE_URL}/get-homefeed-posts/${postsId[i]}`)
            .then((res)=> {
                if(res.data.response){
                    // console.log(posts)
                    if(!idList.includes(res.data.post.id)){
                        idList.push(res.data.post.id)
                        postsToShow.push(res.data.post)
                    }
                    setPosts(postsToShow)
                }
            })
            .catch((err)=> {
                console.log(err)
            })
        })
        
    }
    
    
    useEffect(() => {
        getPostsId();
    }, [])
    
    useEffect(() => {
        if(postsId !== [] || postsId !== null){
            getPosts();
        }
    }, [postsId])

    
    return (
        <Fragment>
            <div className='feed'>
              {posts.map((e, i)=> {
                    return (
                    <div key={i} id={e.id} className='post'>
                        <div className="user_post">
                            <NavLink to={`/profile/${e.username}`}>
                                <p className='username'>{e.username}</p>
                                <img src={`http://juliengodard.sites.3wa.io:9300/avatars/${e.avatar_url}`} alt={`${e.username}'s avatar`} className="little_avatar user_avatar "/>
                            </NavLink>
                        </div>
                       <div>
                            <p>{e.text_content}</p>
                            
                            {e.image !== undefined && <img src={`http://juliengodard.sites.3wa.io:9300/img/${e.image.url}`} alt={`${e.username}'s uploaded picture`} className="post_img"/>}
                            
                            <p className='score'>SCORE : {e.score}</p>
                            <p className='date'>{e.publication_date}</p>
                        </div> 
                        
                        <ul className='post_categories'>
                        {e.categories.map((element, j) => 
                            <li key={j} className='label_category'>{element.name}</li>
                        )}
                        </ul>
                        
                    </div>
                )
                })} 
                
            </div>
        </Fragment>
    )
}
export default HomeFeed;