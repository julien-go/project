import pool from '../config/database.js';
import fs from 'fs';

export const removeAvatar = (req, res) => {
    const checkAvatar = 'SELECT * FROM avatars JOIN users ON users.avatar_id = avatars.id WHERE users.id = ?'
    const deleteAvatar = 'DELETE FROM avatars WHERE avatars.id = ( SELECT avatar_id FROM users WHERE users.id = ?)';
    const setDefaultAvatar = 'UPDATE users SET avatar_id = 91 WHERE id = ?'

    pool.query(checkAvatar, [req.body.id], (err, avatar, fields)=> {
        if (err) throw err;
            console.log(avatar)
        
        if(avatar[0].url.includes('default.jpg')){
            res.json({response: false, msg: "You don't have an avatar"})
        } else {
            pool.query(deleteAvatar, [req.body.id], (err, result, fields) => {
                if (err) throw err;
                console.log(result)
                const path = `public/avatars/${avatar[0].url}`
                fs.unlink(path, (err)=> {
                    if (err) throw err;
                    
                    pool.query(setDefaultAvatar, [req.body.id], (err, avatar, fields)=> {
                        if (err) throw err
                        res.json({response: true, msg: ''})
                    })
                })
            })
        }
    })
}