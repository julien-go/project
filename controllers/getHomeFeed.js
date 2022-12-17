import {pool, asyncQuery} from '../config/database.js';

const getHomeFeed = async (req, res) => {
    const userId = req.params.id;
    
    // On récupère la totalité des posts correspondant à ces catégories
    const posts1 = await getAllPosts(userId)
    
    // On récupère  et ajoute la liste de toutes les catégories relatives à chaque post
    const posts2 = await getAllPostCategories(posts1)
    
    // On récupère et ajoute les images relatives à chaque posts
    const posts = await getPostImage(posts2)
    
    if(posts === []){
        res.json({response: false})
    } else {
        res.json({response: true, posts})
    }
}

export default getHomeFeed;


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
    
    // On récupère la liste des catégories auxquelle l'utilisateur est abonné
    const myCategories = await asyncQuery(selectMyCategories,[userId])
    
    // On liste les id des catégories dans un tableau
    const sqlArray = myCategories ?await getSqlArray(myCategories) : null
    
    // On récupère les posts correspondants en bdd
    const posts = await sqlArray ? asyncQuery(selectPosts, [sqlArray]) : []    
    return posts
}

export const getAllPostCategories = async (array) => {
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

export const getPostImage = async (array) => {
    const selectUrl = 'SELECT url FROM images JOIN posts ON posts.image_id = images.id WHERE posts.id = ?'
    const data = []
    for(let i = 0; i<= array.length; i++){
        if(i === array.length){
            return data
        } else {
            // traitement 
            const image = await asyncQuery(selectUrl, [array[i].id])
            data.push({...array[i], image: image[0]})
        }
    }
}


