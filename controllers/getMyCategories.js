import {pool} from '../config/database.js';

const getMyCategories = (req, res) => {
    
    const selectAllCategories = 'SELECT id, name FROM categories'
    const selectMyCategories = 'SELECT categories.id, categories.name FROM categories JOIN users_categories ON users_categories.categorie_id = categories.id JOIN users ON users.id = users_categories.user_id WHERE users.id = ?';
    // const selectOtherCategories = 'SELECT * FROM categories JOIN users_categories ON categories.id = users_categories.categorie_id JOIN users ON users_categories.user_id = users.id WHERE users.id != ?';
    
    const userId = req.params.id;
    
    pool.query(selectAllCategories, (err, allCats, fields)=>{
        if (err) throw err;
        // console.log(allCats)
        let allCatsId = []
        
        for(let i=0; i < allCats.length; i++){
            allCatsId.push(allCats[i].id)
        }
        
        pool.query(selectMyCategories,[userId], (err, myCats, fields)=>{
            if (err) throw err;
            // console.log(myCats)
            let myCatsId = [];
            
            for(let i=0; i < myCats.length; i++){
                myCatsId.push(myCats[i].id)
            }
            
            const otherCats = allCats.filter(item => !myCatsId.includes(item.id));
        
            res.json({response: true, categories: myCats, otherCategories: otherCats});
        });
    });
};

export default getMyCategories;