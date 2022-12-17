import {pool} from '../config/database.js';
import fs from 'fs';
import {defaultAvatarId} from '../config/defaultAvatar.js'

export const removeAvatar = (req, res) => {
    
    const checkAvatar = 'SELECT * FROM avatars JOIN users ON users.avatar_id = avatars.id WHERE users.id = ?'
    const deleteAvatar = 'DELETE FROM avatars WHERE avatars.id = ( SELECT avatar_id FROM users WHERE users.id = ?)';
    const setDefaultAvatar = 'UPDATE users SET avatar_id = ? WHERE id = ?'

    pool.query(checkAvatar, [req.body.id], (err, avatar, fields)=> {
        if (err) throw err;
        
        if(avatar[0].url.includes('default.jpg')){
            res.json({response: false, msg: "Pas d'avatar à supprimer"})
        } else {
            pool.query(deleteAvatar, [req.body.id], (err, result, fields) => {
                if (err) throw err;
                const path = `public/avatars/${avatar[0].url}`
                fs.unlink(path, (err)=> {
                    if (err) throw err;
                    
                    pool.query(setDefaultAvatar, [defaultAvatarId, req.body.id], (err, avatar, fields)=> {
                        if (err) throw err
                        res.json({response: true, msg: ''})
                    })
                })
            })
        }
    })
}