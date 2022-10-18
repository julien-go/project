import {Fragment, useContext, useState, useEffect} from 'react'
import {useLocation, useNavigate, NavLink} from 'react-router-dom'
import {AppContext} from '../reducer/reducer'
import BASE_URL from "../config.js"
import axios from 'axios'

import VoteBar from './VoteBar'

const HomeFeed = () => {
    const [state, dispatch] = useContext(AppContext)
    const [categoriesId, setCategoriesId] = useState([])
    const [postsId, setPostsId] = useState([])
    const [posts, setPosts] = useState([])
    
    // // On récupère les id des catégories auxquelles le user est abonné
    const getCategoriesId = () => {
        let allCategories = []
        if(state.id !== null){
            axios.get(`${BASE_URL}/get-homefeed-categories/${state.id}`)
            .then((res)=> {
                if(res.data.response && res.data.myCategories){
                    for(let i = 0; i < res.data.myCategories.length; i++){
                        allCategories.push(res.data.myCategories[i].id)
                        setCategoriesId([...allCategories])
                    }
                }
            })
            .catch((err)=> {
                console.log(err)
            })
        }
    }
    
    // // On récupère pour chaque catégories, tout les articles associés
    const getPostsId = () => {
        let allPostsId = []
        categoriesId.map((e, i)=> {
            axios.get(`${BASE_URL}/get-homefeed-posts/${e}`)
            .then((res)=> {
                if(res.data.response){
                    // console.log(res.data.postsId)
                    for(let i = 0; i < res.data.postsId.length; i++){
                        if(!allPostsId.includes(res.data.postsId[i].id)){
                            allPostsId.push(res.data.postsId[i].id)
                        }
                        // console.log(res.data.postsId[i].id)
                    }
                    setPostsId([...allPostsId.sort().reverse()])
                    // console.log(postsId)
                }
            })
            .catch((err)=> {
                console.log(err)
            })
        })
    }
    
    // On récupère les infos de chaque posts
    const getPosts = () => {
        let postsToShow = [];
        postsId.map((e, i) => {
            axios.get(`${BASE_URL}/get-homefeed-infos/${postsId[i]}`)
            .then((res)=> {
                if(res.data.response){
                    // console.log(res.data.post)
                    postsToShow.push(res.data.post)
                    setPosts([...postsToShow.sort(compareId)
                    ])
                }
            })
            .catch((err)=> {
                console.log(err)
            })
        })
    }
    
    const refresh = (e) => {
        e.preventDefault();
        getCategoriesId()
    }
    
    const compareId = (a, b) => {
        if(a.id < b.id) return 1
        if(a.id > b.id) return -1
        else return 0
    }
    
    // Au chargement du composant
    useEffect(() => {
        getCategoriesId();
    }, [])
    
    // A l'update du state categoriesId
    useEffect(() => {
        if(categoriesId !== [] || categoriesId !== null){
            getPostsId();
        }
    }, [categoriesId])
    
    // A l'update du state postsId
    useEffect(() => {
        if(postsId !== [] || postsId !== null){
            getPosts();
        }
    }, [postsId])
    

    // useEffect(()=> {
    //      console.log(posts)
    //     // console.log(categoriesId)
    // })
    
    return (
        <Fragment>
            <div className='feed'>
                <form onSubmit={e => refresh(e)}>
                    <input type='submit' value='Refresh'/>
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
                            {e.categories.map((element, j) => 
                                <li key={j} className='label_category'>{element.name}</li>
                            )}
                            </ul>
                        </div>
                       <div className='post_content'>
                            <p>{e.text_content}</p>
                            
                            {e.image !== undefined &&
                            <div className='post_img_container'>
                            <img src={`http://juliengodard.sites.3wa.io:9300/img/${e.image.url}`} alt={`${e.username}'s uploaded picture`} className="post_img"/>
                            </div>
                            }
                            
                            <p className='date'>{e.publication_date}</p>
                        </div> 
                        <div className='vote_bar'>
                            <VoteBar post_id={e.id} user_id={state.id} score={e.score}/>
                        </div>
                    </div>
                )
                })} 
                
            </div>
        </Fragment>
    )
}
export default HomeFeed;