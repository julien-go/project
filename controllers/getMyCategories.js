import pool from '../config/database.js';

const getMyCategories = (req, res) => {
    
    const selectMyCategories = 'SELECT * FROM categories WHERE id = (SELECT categorie_id FROM users_categories WHERE user_id = ?)';
    const selectOtherCategories = 'SELECT * FROM categories WHERE NOT id = (SELECT categorie_id FROM users_categories WHERE user_id = ?)';
    
    const userId = req.query.id;
    
    pool.query(selectMyCategories, [userId], (err, cats, fields)=>{
        if (err) throw err
        console.log(cats)
        let categories = [];
        for(let i = 0; i < cats.length; i++){
            categories.push({id: cats[i].id, name: cats[i].name})
        }
        console.log(categories)
        pool.query(selectOtherCategories,[userId], (err, otherCats, fields)=>{
            if (err) throw err;
            let otherCategories = [];
            for(let j = 0; j < otherCats.length; j++){
                otherCategories.push({id: otherCats[j].id, name: otherCats[j].name})
            }
            res.json({response: true, categories, otherCategories})
        })
        
    })
    
}

export default getMyCategories;