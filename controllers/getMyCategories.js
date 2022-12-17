import {pool} from '../config/database.js';

const getMyCategories = (req, res) => {
    
    const selectAllCategories = 'SELECT id, name FROM categories'
    const selectMyCategories = 'SELECT categories.id, categories.name FROM categories JOIN users_categories ON users_categories.categorie_id = categories.id JOIN users ON users.id = users_categories.user_id WHERE users.id = ?';
   
    
    const userId = req.params.id;
    
    // On récupère toutes les catégories en bdd
    pool.query(selectAllCategories, (err, allCats, fields)=>{
        if (err) throw err;
        let allCatsId = []
        
        for(let i=0; i < allCats.length; i++){
            allCatsId.push(allCats[i].id)
        }
        
        // On récupère les catégories auxquelles le user est abonné
        pool.query(selectMyCategories,[userId], (err, myCats, fields)=>{
            if (err) throw err;
            let myCatsId = [];
            
            for(let i=0; i < myCats.length; i++){
                myCatsId.push(myCats[i].id)
            }
            
            // On filtre pour avoir toutes les catégories auxquelles le user n'est pas abonné
            const otherCats = allCats.filter(item => !myCatsId.includes(item.id));
        
            res.json({response: true, categories: myCats, otherCategories: otherCats});
        });
    });
};

export default getMyCategories;