import {pool} from '../config/database.js';

const getCategories = (req, res) => {
    
    const selectCategories = 'SELECT * FROM categories'
    
    // On sélectionne toutes les catégories existantes dans la bdd
    pool.query(selectCategories, (err, cats, fields)=>{
        if (err) throw err
        
        let categories = [];
        for(let i = 0; i < cats.length; i++){
            categories.push({id: cats[i].id, name: cats[i].name})
        }
        res.json({response: true, categories})
    })
}

export default getCategories;