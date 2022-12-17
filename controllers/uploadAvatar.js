import {pool} from '../config/database.js';
import formidable from 'formidable';
import fs from 'fs';
import checkAcceptedExtensions from '../components/checkExtension/index.js'
import {defaultAvatarId} from '../config/defaultAvatar.js'

export const uploadAvatar = (req, res) => {
    const form = formidable({keepExtensions: true});
    const maxSize = 2000000;
    const acceptedExtensions = ['jpeg', 'jpg', 'png', 'gif'];
    
    form.parse(req, async (err, fields, files) => {
        if (err) throw err;
        const currentUsername = fields.username;
        
        let file = files.files;
        let newFilename = files.files.newFilename;
        let oldPath = files.files.filepath;
        let newPath = `public/avatars/${newFilename}`;
        
        const isExtensionValid = await checkAcceptedExtensions(file, acceptedExtensions)
        if(!isExtensionValid){
            res.json({response: false, msg: 'Problème de format du fichier'})
        } else {
            if(file.size > maxSize) {
               res.json({response: false, msg: 'Image trop volumineuse (max: 2mo)'}) 
            } else {
                
                if(files.originalFilename !== ''){
                    fs.copyFile(oldPath, newPath, (err) => {
                        if (err) throw err;
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
                        
                        pool.query(addAvatar, [newFilename], (err, avatar, fields) => {
                            if (err) throw err;
                            const newId = avatar.insertId;
                            
                            pool.query(checkAvatarUser, [currentUsername], (err, user, fields) => {
                                if (err) throw err;
                                const oldId = user[0].avatar_id;
                                
                                pool.query(changeId, [newId, currentUsername], (err, updatedUser, fields) => {
                                    if (err) throw err;
                                    if(oldId !== null && oldId !== defaultAvatarId){
                                        
                                        pool.query(oldAvatarPath, [oldId], (err, oldAvatar, fields) => {
                                            if (err) throw err;
                                            const path = `public/avatars/${oldAvatar[0].url}`
                                            fs.unlink(path, (err)=> {
                                                if (err) throw err;
                                                
                                                pool.query(deleteOld, [oldId], (err, user, fields)=> {
                                                    if (err) throw err;
                                                    res.json({response: true, msg: 'Remplacé avec succès !'})
                                                })
                                            });
                                        })
                                        
                                    } else {
                                        res.json({response: true, msg: 'Ajouté avec succès !'})
                                    }
                                })
                            })
                        })
                    }) 
                }
            }
        }
        
    })
}


