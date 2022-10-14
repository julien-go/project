import pool from '../config/database.js';

const getHomeFeed = (req, res) => {

    // Recuperation des categories auxquelles le user est abonné 
    
    const selectMyCategories = 'SELECT categories.id FROM categories JOIN users_categories ON users_categories.categorie_id = categories.id JOIN users ON users.id = users_categories.user_id WHERE users.id = ?';
    const selectPostsId = 'SELECT posts.id FROM posts JOIN posts_categories ON posts_categories.post_id = posts.id WHERE posts_categories.categorie_id = ? '

    const userId = req.params.id;
    
    pool.query(selectMyCategories, [userId], (err, myCategories, fields)=> {
            if (err) throw err;
            // console.log(myCategories)
            let postsId = []
            for(let i = 0; i < myCategories.length; i++){
                pool.query(selectPostsId, [myCategories[i].id], (err, allPostsId, fields)=> {
                    if (err) throw err
                    for(let j =0; j < allPostsId.length; j++){
                        if(!postsId.includes(allPostsId[j].id)){
                            postsId.push(allPostsId[j].id)
                        }
                    }
                    if(i === myCategories.length - 1){
                        res.json({response: true, postsId})
                    }
                } )
            }
        })        
}

export default getHomeFeed; 

/*
1 - SELECTIONNER LES CATEGORIES SUIVIES PAR L'UTILISATEUR
2 - SELECTIONNER TOUT LES POSTS CORRESPONDANTS A CES CATEGORIES
3 - RECUPERER UNE SEULE FOIS LES ID DES POSTS


*/