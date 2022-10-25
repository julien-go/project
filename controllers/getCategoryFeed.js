import {pool, asyncQuery} from '../config/database.js';

const getAllPosts= async (categoryName) => {
    const selectPosts = 'SELECT DISTINCT posts.id, posts.text_content, DATE_FORMAT(posts.publication_date,"%d/%m/%Y %H:%i") AS publication_date, users.username, users.id AS user_id, users.avatar_id, avatars.url AS avatar_url ,posts_scores.score, posts.image_id, images.url FROM posts LEFT JOIN users ON users.id = posts.user_id LEFT JOIN posts_categories ON posts_categories.post_id = posts.id LEFT JOIN categories ON categories.id = posts_categories.categorie_id LEFT JOIN avatars ON avatars.id = users.avatar_id LEFT JOIN posts_scores ON posts_scores.post_id = posts.id LEFT JOIN images ON images.id = posts.image_id WHERE categories.name = ?'
    
    const posts = await categoryName ? asyncQuery(selectPosts, [categoryName]) : []    
    return posts
}

const getAllPostCategories = async (array) => {
    const selectCategoriesPost = 'SELECT name FROM categories JOIN posts_categories ON categories.id = posts_categories.categorie_id WHERE posts_categories.post_id = ?'
    const data = []
    for(let i = 0; i<= array.length; i++){
        if(i === array.length){
            return data
        } else {
            const categories = await asyncQuery(selectCategoriesPost, [array[i].id])
            data.push({...array[i], categories})
        }
    }
}

const getCategoryFeed = async (req, res) => {
    const name = req.params.id;
    const postsList = await getAllPosts(name)
    const posts = await getAllPostCategories(postsList)
    if(posts === []){
        res.json({response: false})
    } else {
        console.log(1)
        res.json({response: true, posts})
    }
}

export default getCategoryFeed;

