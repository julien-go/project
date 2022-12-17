import {pool} from '../config/database.js';

const followCategories = (req, res) => {
    
    const addNewUserCat = 'INSERT INTO users_categories (user_id, categorie_id) VALUES (?, ?)';
    
    const toAdd = req.body.toAdd;
    const userId = req.body.userId;
    
    // Pour chaque catégorie choisies, on créé une entrée contenant l'id de l'utilisateur et l'id de la catégorie dans la bdd
    for(let i = 0; i <toAdd.length; i++){
        pool.query(addNewUserCat, [userId, toAdd[i].id], (err, add, fields)=>{
            if (err) throw err
        })
    }
    res.json({response: true})
}
export default followCategories