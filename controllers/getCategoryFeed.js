import pool from '../config/database.js';

const getCategoryFeed = (req, res) => {
    
    const selectPostsID = 'SELECT posts.id FROM posts JOIN posts_categories ON posts_categories.post_id = posts.id JOIN categories ON categories.id = posts_categories.categorie_id WHERE categories.name = ? ORDER BY posts.id DESC LIMIT 25'
    
    const selectInfosPost = 'SELECT posts.text_content, DATE_FORMAT( posts.publication_date, "%D %b %Y" ) AS publication_date, users.username, users.id AS user_id, users.avatar_id, avatars.url AS avatar_url, posts_scores.score FROM posts JOIN users ON users.id = posts.user_id JOIN posts_categories ON posts_categories.post_id = posts.id JOIN avatars ON avatars.id = users.avatar_id JOIN posts_scores ON posts_scores.post_id = posts.id WHERE posts.id = ?';
    const selectCategoriesPost = 'SELECT name FROM categories JOIN posts_categories ON categories.id = posts_categories.categorie_id WHERE posts_categories.post_id = ?'
    const selectImagePost = 'SELECT images.id AS image_id, images.url FROM images JOIN posts ON posts.image_id = images.id WHERE posts.id = ?'
    
    // console.log(req.params)
    pool.query(selectPostsID, [req.params.id], (err, postsId, fields)=> {
        if (err) throw err;
        
        // console.log(postsId.length)
        let postsToShow = [];
        
        if(postsId === []){
            res.json({response: false})
        } else {
            
       
            for(let i = 0; i < postsId.length; i++){
                pool.query(selectInfosPost, [postsId[i].id], (err, post, fields)=> {
                    if (err) throw err;
                    pool.query(selectCategoriesPost, [postsId[i].id], (err, cats, fields) => {
                        if (err) throw err
                        // console.log(cats)
                        let postCategories = []
                        for(let j =0; j < cats.length; j++){
                            if(!postCategories.includes(cats[j])){
                                postCategories.push(cats[j])
                            }
                        }
                        
                        pool.query(selectImagePost, [postsId[i].id], (err, img, fields)=> {
                            if (err) throw err;
                            postsToShow.push({...post[0], id: postsId[i].id, categories: postCategories, image: img[0]})
                            // console.log(post)
                            if(i === postsId.length-1){
                                // console.log(postsToShow)
                                res.json({response: true, posts: postsToShow})
                            }
                        })
                    })
                })
            }
        }
    })
}

export default getCategoryFeed;