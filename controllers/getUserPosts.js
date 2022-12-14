import {pool, asyncQuery} from '../config/database.js';
import {getPostImage, getAllPostCategories} from '../controllers/getHomeFeed.js'

const getAllPosts= async (categoryName) => {
    const selectPosts = 'SELECT DISTINCT posts.id, posts.text_content, DATE_FORMAT(posts.publication_date,"%d/%m/%Y %H:%i") AS publication_date, users.username, users.id AS user_id, users.avatar_id, avatars.url AS avatar_url ,posts_scores.score, posts.image_id, images.url FROM posts LEFT JOIN users ON users.id = posts.user_id LEFT JOIN posts_categories ON posts_categories.post_id = posts.id LEFT JOIN categories ON categories.id = posts_categories.categorie_id LEFT JOIN avatars ON avatars.id = users.avatar_id LEFT JOIN posts_scores ON posts_scores.post_id = posts.id LEFT JOIN images ON images.id = posts.image_id WHERE users.username = ?'
    
    const posts = await categoryName ? asyncQuery(selectPosts, [categoryName]) : []    
    return posts
}

const getUserPosts = async (req, res) => {
    const name = req.params.username;
    
    // On récupère tout les posts de l'utilisateur grâce à son pseudo
    const posts1 = await getAllPosts(name)
    
    // On récupère et ajoute les catégories relatives à chaque posts
    const posts2 = await getAllPostCategories(posts1)
    
    // On récupère et ajoute les images relatives à chaque posts
    const posts = await getPostImage(posts2)
    if(posts === []){
        res.json({response: false})
    } else {
        res.json({response: true, posts})
    }
}

export default getUserPosts;

