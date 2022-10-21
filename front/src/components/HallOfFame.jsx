
const HallOfFame = () => {
    
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
      
    const refresh = () => {
        // e.preventDefault();
        getCategoriesId()
    }
    
    const compareId = (a, b) => {
        if(a.id < b.id) return 1
        if(a.id > b.id) return -1
        else return 0
    }
    
  return (
      <Fragment>
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