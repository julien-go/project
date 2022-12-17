import {pool} from '../config/database.js';

const unfollowCategories = (req, res) => {
    
    const removeCat = 'DELETE FROM users_categories WHERE user_id = ? AND categorie_id = ?';
    
    const toRemove = req.body.toRemove;
    const userId = req.body.userId;
    
    for(let i = 0; i < toRemove.length; i++){
        pool.query(removeCat, [userId, toRemove[i].id], (err, add, fields)=>{
            if (err) throw err
        })
    }
    res.json({response: true})
}
export default unfollowCategories