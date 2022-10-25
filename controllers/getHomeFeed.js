import {pool, asyncQuery} from '../config/database.js';

const getSqlArray = (myCategories) =>  {
    const categories = []
    
    for(let i = 0; i < myCategories.length; i++){
        categories.push(myCategories[i].id)
        
        if(i === myCategories.length-1){
            return categories
        }
    }
}

const getAllPosts= async (userId) => {
    const selectMyCategories = 'SELECT categories.id FROM categories JOIN users_categories ON users_categories.categorie_id = categories.id JOIN users ON users.id = users_categories.user_id WHERE users.id = ? ORDER BY categories.id DESC';
    
    const selectPosts = 'SELECT DISTINCT posts.id, posts.text_content, DATE_FORMAT( posts.publication_date, "%d/%m/%Y %H:%i") AS publication_date, users.username, users.id AS user_id, users.avatar_id, avatars.url AS avatar_url, posts_scores.score FROM posts JOIN users ON users.id = posts.user_id JOIN posts_categories ON posts_categories.post_id = posts.id JOIN avatars ON avatars.id = users.avatar_id JOIN posts_scores ON posts_scores.post_id = posts.id WHERE posts_categories.categorie_id IN (?)'
    
    const myCategories = await asyncQuery(selectMyCategories,[userId])
    const sqlArray = myCategories ?await getSqlArray(myCategories) : null
    const posts = await sqlArray ? asyncQuery(selectPosts, [sqlArray]) : []    
    return posts
}

const getAllPostCategories = async (array) => {
    const selectCategoriesPost = 'SELECT name FROM categories JOIN posts_categories ON categories.id = posts_categories.categorie_id WHERE posts_categories.post_id = ?'
    const data = []
    for(let i = 0; i<= array.length; i++){
        if(i === array.length){
            return data
        } else {
            // traitement 
            const categories = await asyncQuery(selectCategoriesPost, [array[i].id])
            data.push({...array[i], categories})
        }
    }
}

const getHomeFeed = async (req, res) => {
    const userId = req.params.id;
    const selectMyCategories = 'SELECT categories.id FROM categories JOIN users_categories ON users_categories.categorie_id = categories.id JOIN users ON users.id = users_categories.user_id WHERE users.id = ? ORDER BY categories.id DESC';
    const myCategories = await asyncQuery(selectMyCategories,[userId])
    const postsList = await getAllPosts(userId)
    const posts = await getAllPostCategories(postsList)
    
    if(posts === []){
        res.json({response: false})
    } else {
        res.json({response: true, posts})
    }
}

export default getHomeFeed;
