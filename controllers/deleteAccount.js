import {pool} from '../config/database.js';
import {defaultAvatarId} from '../config/defaultAvatar.js'

const deleteAccount = (req, res) => {
    const deleteUser = 'DELETE FROM users WHERE id = ?'
    const selectCurrentAvatar = 'SELECT avatar_id FROM users WHERE id = ?'
    const deleteAvatarUser = 'DELETE FROM avatars WHERE id = (SELECT avatar_id FROM users WHERE id = ?)'
    console.log(req.body)
    
    if(!req.body.id){
        res.json({response: false})
    } else {
        pool.query(deleteUser, [req.body.id], (err, result, fields)=>{
            if (err) throw err
            req.session.destroy((err) =>{
        		if (err) throw err
        		
        		console.log('compte supprimmé')
        		res.json({response: true})
	        })
        })
    }
}

export default deleteAccount;