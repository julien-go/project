import pool from '../config/database.js';

const getHomeFeedPosts = (req, res) => {

    
    const selectInfosPost = 'SELECT posts.text_content, DATE_FORMAT( posts.publication_date, "%D %b %Y" ) AS publication_date, users.username, users.id AS user_id, users.avatar_id, avatars.url AS avatar_url, posts_scores.score FROM posts JOIN users ON users.id = posts.user_id JOIN posts_categories ON posts_categories.post_id = posts.id JOIN avatars ON avatars.id = users.avatar_id JOIN posts_scores ON posts_scores.post_id = posts.id WHERE posts.id = ?';
    
    const selectCategoriesPost = 'SELECT name FROM categories JOIN posts_categories ON categories.id = posts_categories.categorie_id WHERE posts_categories.post_id = ?'
    const selectImagePost = 'SELECT images.id AS image_id, images.url FROM images JOIN posts ON posts.image_id = images.id WHERE posts.id = ?'
    
    const postId = req.params.id;
        
        if(postId === []){
            res.json({response: false})
        } else {
            pool.query(selectInfosPost, [postId], (err, post, fields)=> {
                if (err) throw err
                pool.query(selectCategoriesPost, [postId], (err, cats, fields) => {
                    if (err) throw err
                    let postCategories = []
                    for(let j =0; j < cats.length; j++){
                        if(!postCategories.includes(cats[j])){
                            postCategories.push(cats[j])
                        }
                    }
                    pool.query(selectImagePost, [postId], (err, img, fields)=> {
                            if (err) throw err;
                            // console.log({response:true, post: {...post[0], id: postId, categories: cats, image: img[0]}})
                            res.json({response:true, post: {...post[0], id: postId, categories: cats, image: img[0]}})
                    })
                    
                })
            })
        }
    
    
    // res.json({response: true, req: req.params})
    
}

export default getHomeFeedPosts; 

/*
1 - SELECTIONNER LES CATEGORIES SUIVIES PAR L'UTILISATEUR
2 - SELECTIONNER TOUT LES POSTS CORRESPONDANTS A CES CATEGORIES
3 - RECUPERER UNE SEULE FOIS LES ID DES POSTS


*/