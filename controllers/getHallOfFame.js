import {pool, asyncQuery} from '../config/database.js';
import {getPostImage, getAllPostCategories} from '../controllers/getHomeFeed.js'

const getAllPosts= async () => {
    const minimumScore = 10;
    const selectPosts = 'SELECT DISTINCT posts.id, posts.text_content, DATE_FORMAT(posts.publication_date,"%d/%m/%Y %H:%i") AS publication_date, users.username, users.id AS user_id, users.avatar_id, avatars.url AS avatar_url ,posts_scores.score, posts.image_id, images.url FROM posts LEFT JOIN users ON users.id = posts.user_id LEFT JOIN posts_categories ON posts_categories.post_id = posts.id LEFT JOIN categories ON categories.id = posts_categories.categorie_id LEFT JOIN avatars ON avatars.id = users.avatar_id LEFT JOIN posts_scores ON posts_scores.post_id = posts.id LEFT JOIN images ON images.id = posts.image_id WHERE posts_scores.score >= ?'
    const posts = await asyncQuery(selectPosts, [minimumScore])
    return posts
}


const getHallOfFame = async (req, res) => {
    // On sélectionne tout les posts ayant un score d'au moins 10
    const posts1 = await getAllPosts()
    const posts2 = await getAllPostCategories(posts1)
    const posts = await getPostImage(posts2)
    if(posts === []){
        res.json({response: false})
    } else {
        res.json({response: true, posts})
    }
}

export default getHallOfFame;