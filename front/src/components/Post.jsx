import {Fragment, useContext, useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import {AppContext} from '../reducer/reducer'


import VoteBar from './VoteBar'
import DeletePost from './DeletePost'
import ReportPost from './ReportPost'


const Post = ({post, refresh}) => {
    const [state, dispatch] = useContext(AppContext)
    
    return ( 
        <div id={post.id} className='post'>
            <div className="post_header">
                <NavLink className='post_user' to={`/profile/${post.username}`}>
                    <p className='username'>{post.username}</p>
                    <img src={`http://juliengodard.sites.3wa.io:9300/avatars/${post.avatar_url}`} alt={`${post.username}'s avatar`} className="little_avatar user_avatar "/>
                </NavLink>
                <ul className='post_categories'>
                {post.categories.map((element, j) => 
                    <li key={j} className='label_category'>{element.name}</li>
                )}
                </ul>
                
                <div className='delete_report_bar'>
                    {(state.id === post.user_id || state.isAdmin) && 
                        <DeletePost postId={post.id} img={post.image} refresh={refresh}/>
                    }
                    {state.id !== post.user_id &&<ReportPost postId={post.id}/>}
                </div>
            </div>
           <div className='post_content'>
                <p>{post.text_content}</p>
                
                {post.image !== undefined &&
                <img src={`http://juliengodard.sites.3wa.io:9300/img/${post.image.url}`} alt={`${post.username}'s uploaded picture`} className="post_img"/>
                }
            </div> 
            
            <div className='vote_bar'>
                <VoteBar post_id={post.id} user_id={state.id} score={post.score}/>
            </div>
            <div className='date_container'>
                <div className='date'>{post.publication_date}</div>
            </div>
        </div>
    )
}

export default Post