import {pool} from '../config/database.js';

const getCategories = (userId) => {
    // Recuperation des categories auxquelles le user est abonné
    const selectMyCategories = 'SELECT categories.id FROM categories JOIN users_categories ON users_categories.categorie_id = categories.id JOIN users ON users.id = users_categories.user_id WHERE users.id = ? ORDER BY categories.id DESC';
    pool.query(selectMyCategories, [userId], (err, myCategories, fields)=> {
        if (err) throw err;
            if(myCategories === []){
                return []
            } else {
                return myCategories
            }
    })        
}

const getPosts = (categoriesId) => {
    console.log(categoriesId)
    // Recuperation des categories auxquelles le user est abonné 
    const selectPosts = 'SELECT DISTINCT posts.id, posts.text_content, DATE_FORMAT( posts.publication_date, "%d/%m/%Y %H:%i:%s") AS publication_date, users.username, users.id AS user_id, users.avatar_id, avatars.url AS avatar_url, posts_scores.score FROM posts JOIN users ON users.id = posts.user_id JOIN posts_categories ON posts_categories.post_id = posts.id JOIN avatars ON avatars.id = users.avatar_id JOIN posts_scores ON posts_scores.post_id = posts.id WHERE posts_categories.categorie_id IN ?'
    
    pool.query(selectPosts, [categoriesId], (err, posts, fields)=> {
        if (err) throw err;
            if(posts === []){
                return []
            } else {
                return posts
            }
    })    
}

const getHomeFeed = async (req, res) => {
    const userId = req.params.id;
    const categoriesId =  await getCategories(userId);
    const posts = await getPosts(categoriesId)
    if(posts === []){
        res.json({response: false})
    } else {
        res.json({response: true, posts})
    }
}

export default getHomeFeed;
/*
1 - SELECTIONNER LES CATEGORIES SUIVIES PAR L'UTILISATEUR
2 - SELECTIONNER TOUT LES POSTS CORRESPONDANTS A CES CATEGORIES
3 - RECUPERER UNE SEULE FOIS LES ID DES POSTS
*/