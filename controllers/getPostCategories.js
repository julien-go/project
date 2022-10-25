import {pool} from '../config/database.js';

const getPostCategories = (req, res) => {

    const selectCategories = 'SELECT name FROM categories JOIN posts_categories ON categories.id = posts_categories.categorie_id WHERE posts_categories.post_id = ?';
    
    const postId = req.params.id
    
    pool.query(selectCategories, [postId], (err, categories, fields)=> {
        if (err) throw err
        
        if(!categories[0]) {
            res.json({response: false})
        } else {
            res.json({response: true, categories})
        }
        
    })
}

export default getPostCategories;