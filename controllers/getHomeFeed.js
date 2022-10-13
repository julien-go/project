import pool from '../config/database.js';

const getHomeFeed = (req, res) => {

    // Recuperation des categories auxquelles le user est abonné 
    
    const selectAllPosts = 'SELECT * FROM posts ORDER BY id DESC LIMIT 200'
    const selectMyCategories = 'SELECT categories.id, categories.name FROM categories JOIN users_categories ON users_categories.categorie_id = categories.id JOIN users ON users.id = users_categories.user_id WHERE users.id = ?';

    // Recuperation et tri des posts qui correspondent et des infos importantes
    const selectPosts = 'SELECT posts.text_content, posts.publication_date, users.username, users.id AS user_id, users.avatar_id, avatars.url AS avatar_url, posts_scores.score FROM posts JOIN users ON users.id = posts.user_id JOIN posts_categories ON posts_categories.post_id = posts.id JOIN avatars ON avatars.id = users.avatar_id JOIN posts_scores ON posts_scores.post_id = posts.id WHERE posts.id = ?'
    
    // Recuperation des categories correspondant a un post
    const postCategories = 'SELECT * FROM categories WHERE posts.id = ?'
    
    const userId = req.params.id;
    
    pool.query(selectAllPosts, (err, allposts, fields)=> {
        if (err) throw err;
        
        pool.query(selectMyCategories, [userId], (err, myCategories, fields)=> {
            if (err) throw err;
            
            let myCategoriesId = []
            for(let i=0; i < myCategories.length; i++){
                myCategoriesId.push(myCategories[i].id)
            }
            
            const postsToShow = allposts.filter(item => !myCategoriesId.includes(item.id)) ;
            // console.log(postsToShow)
        })        
    })

    // let selectedPosts = [];
    // let selectedPostId = [];
    // let myCategoriesId = [];
        
    // pool.query(selectMyCategories, [userId],(err, myCats, fields) => {
    //     if (err) throw err
        
    //     for(let i=0; i < myCats.length; i++){
    //         myCategoriesId.push(myCats[i].id)
    //     }
    //     // console.log(myCategoriesId)
        
    //     pool.query(selectPostsId, [])
        
    //     // On select les 15 derniers articles pour chaque catégorie suivie dans la BDD
    //     // for (let j = 0; j < myCategoriesId.length; j++){
    //     //     pool.query(selectPostsId, [myCategoriesId[j]], (err, result, fields) => {
    //     //         if (err) throw err
    //     //         console.log(result)
    //     //         // On vérifie pour chaque article, si il n'est pas déjà présent en stockant les id 
    //     //         for(let k = 0; k < result.length; k++){
    //     //             // Si l'id du post n'est pas déjà présent 
    //     //             if(!selectedPostId.includes(result[k].id)){
    //     //                 selectedPostId.push(result[k].id)
                        
    //     //                 pool.query(selectPosts, [result[k].id], (err, post, fields)=>{
    //     //                     if (err) throw err;
                            
    //     //                     // console.log(post)
    //     //                 })
    //     //                 selectedPosts.push(result[k])
    //     //             }
    //     //         }
    //     //         // console.log(selectedPostId)
    //     //     })

    //     // }
         
    // })
    
}

export default getHomeFeed; 

/*
1 - SELECTIONNER LES CATEGORIES SUIVIES PAR L'UTILISATEUR
2 - SELECTIONNER TOUT LES POSTS CORRESPONDANTS A CES CATEGORIES
3 - RECUPERER UNE SEULE FOIS LES ID DES POSTS


*/