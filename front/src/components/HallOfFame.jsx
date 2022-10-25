import {Fragment, useContext, useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from 'axios'
import {AppContext} from '../reducer/reducer'
import VoteBar from './VoteBar'
import DeletePost from './DeletePost'

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
        <h1>Hall of fame</h1>
        <div className='feed'>
                <div className='refresh_container' >
                    <button onClick={()=> refresh} className='action_btn'  >Rafraichir la page</button>
                </div>
              {posts.map((e, i)=> {
                    return (
                    <div key={e.id} id={e.id} className='post'>
                        <div className="post_header">
                            <NavLink className='post_user' to={`/profile/${e.username}`}>
                                <p className='username'>{e.username}</p>
                                <img src={`http://juliengodard.sites.3wa.io:9300/avatars/${e.avatar_url}`} alt={`${e.username}'s avatar`} className="little_avatar user_avatar "/>
                            </NavLink>
                            <ul className='post_categories'>
                            {e.categories.map((element, j) => 
                                <li key={j} className='label_category'>{element.name}</li>
                            )}
                            </ul>
                        </div>
                       <div className='post_content'>
                            <p>{e.text_content}</p>
                            
                            {e.image !== undefined &&
                            <img src={`http://juliengodard.sites.3wa.io:9300/img/${e.image.url}`} alt={`${e.username}'s uploaded picture`} className="post_img"/>
                            }
                        </div> 
                        
                        <div className='vote_bar'>
                            <VoteBar post_id={e.id} user_id={state.id} score={e.score}/>
                        </div>
                        <div className='date_container'>
                            <div className='date'>{e.publication_date}</div>
                        </div>
                        {(state.id === e.user_id || state.isAdmin) && 
                            <DeletePost postId={e.id} img={e.image} refresh={refresh}/>
                        }
                    </div>
                )
                })} 
                
            </div>
      </Fragment>
    )  
}

export default HallOfFame;