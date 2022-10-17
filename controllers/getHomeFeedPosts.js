import pool from '../config/database.js';

const getHomeFeedPosts = (req, res) => {
    /*39 et 43 musique, 37 et 40*/
    // Recuperation des categories auxquelles le user est abonné 
    
    const selectPostsId = 'SELECT posts.id FROM posts JOIN posts_categories ON posts_categories.post_id = posts.id WHERE posts_categories.categorie_id = ? ORDER BY posts.id'

    const categoryId = req.params.id;
    pool.query(selectPostsId, [categoryId], (err, postsId, fields)=> {
        if (err) throw err;
            if(postsId === []){
                res.json({response: false}) 
            } else {
                res.json({response: true, postsId})
            }
        

    //             for(let i = 0; i < myCategories.length; i++){
    //                 pool.query(selectPostsId, [myCategories[i].id], (err, allPostsId, fields)=> {
    //                     if (err) throw err
    //                     console.log(allPostsId)
                        
    //                     for(let j = 0; j < allPostsId.length; j++){
    //                         // console.log('ok')
    //                         // if(!postsId.includes(allPostsId[j].id)){
    //                         postsId.push(allPostsId[j].id)
    //                         if(i === myCategories.length - 1 && j === allPostsId.length - 1){
    //                             console.log(postsId)
    //                             res.json({response: true, postsId:[...new Set(postsId)]})
    //                         }
    //                     }
    //                 })
    //             }
    })        
}

export default getHomeFeedPosts; 

/*
1 - SELECTIONNER LES CATEGORIES SUIVIES PAR L'UTILISATEUR
2 - SELECTIONNER TOUT LES POSTS CORRESPONDANTS A CES CATEGORIES
3 - RECUPERER UNE SEULE FOIS LES ID DES POSTS


*/