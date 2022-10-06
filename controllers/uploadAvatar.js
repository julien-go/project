import pool from '../config/database.js';
import formidable from 'formidable';
import fs from 'fs';
import checkAcceptedExtensions from '../components/checkExtension/index.js'

export const uploadAvatar = (req, res) => {
    const form = formidable({keepExtensions: true});
    form.parse(req, (err, fields, files) => {
        if (err) throw err;
        // console.log(1)
        const currentUsername = fields.username;
        // console.log(fields)
        // console.log(files)
        
        let file = files.files;
        // console.log(file)
        let newFilename = files.files.newFilename;
        let oldPath = files.files.filepath;

        let newPath = `public/avatars/${newFilename}`;
        // console.log(newPath)
        if(checkAcceptedExtensions(file)){
        // console.log(2)
            if(files.originalFilename !== ''){
        // console.log(3)
                fs.copyFile(oldPath, newPath, (err) => {
                    if (err) throw err;
        // console.log(4)
                    /*
                    Ajouter nouvel avatar BDD
                    Recuperer id nouvel avatar
                    Vérifier BDD si le user a déjà un avatar
                    Changer avatar_id du user
                    Supprimer old avatar
                    */
                    const addAvatar = 'INSERT INTO avatars (url) VALUES (?)'
                    const checkAvatarUser = 'SELECT avatar_id FROM users WHERE username = ?'
                    const changeId = 'UPDATE users SET avatar_id = ? WHERE username = ?'
                    const oldAvatarPath = 'SELECT url FROM avatars WHERE id = ?'
                    const deleteOld = 'DELETE FROM avatars WHERE id = ?'
                    
                    pool.query(addAvatar, [newPath], (err, avatar, fields) => {
                        if (err) throw err;
        // console.log(5)
                        const newId = avatar.insertId;
                        
                        pool.query(checkAvatarUser, [currentUsername], (err, user, fields) => {
                            if (err) throw err;
        // console.log(6)
                            const oldId = user[0].avatar_id;
                            
                            pool.query(changeId, [newId, currentUsername], (err, updatedUser, fields) => {
                                if (err) throw err;
        // console.log(7)
                                console.log(oldId)
                                if(oldId !== null && oldId !== 91){
                                    
                                    pool.query(oldAvatarPath, [oldId], (err, oldAvatar, fields) => {
                                        if (err) throw err;
        // console.log(8)
                                        const path = oldAvatar[0].url
                                        fs.unlink(path, (err)=> {
                                            if (err) throw err;
        // console.log(9)
                                            
                                            pool.query(deleteOld, [oldId], (err, user, fields)=> {
                                                if (err) throw err;
        // console.log(10)
                                                res.json({response: true, msg: 'successfully replaced'})
                                            })
                                        });
                                    })
                                    
                                } else {
                                    // console.log(11)
                                    res.json({response: true, msg: 'successfully added'})
                                }
                            })
                        })
                    })
                }) 
            }
        } else {
            // console.log(12)
            res.json({response: false, msg: 'Format not accepted'})
        }
        
        }
    )
}

