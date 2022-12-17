import {pool, asyncQuery} from '../config/database.js';
import {defaultAvatarId} from '../config/defaultAvatar.js'
import fs from 'fs';



const deleteAccount = async (req, res) => {
    
    const id = req.body.id
    const deleteUser = 'DELETE FROM users WHERE id = ?'
    
    const deleteAvatarUser = 'DELETE FROM avatars WHERE id = (SELECT avatar_id FROM users WHERE id = ?)'
    
    if(!req.body.id){
        res.json({response: false})
    } else {
        
        // On supprime les images postées par l'utilisateur
        const imagesDeleted = await deleteImages(id)
        
        // On supprime l'avatar de l'utilisateur si ce n'est pas celui par défaut
        const avatarDeleted = await deleteAvatar(id)
        
        // On supprime l'utilisateur de la bdd
        const userDeleted = await asyncQuery(deleteUser, [id])
        res.json({response: true})
    }
}

export default deleteAccount;


const deleteAvatar = async (id) => {
    const selectAvatar = 'SELECT avatar_id, avatars.url FROM users JOIN avatars ON avatars.id = avatar_id WHERE users.id = ?'
    const deleteAvatarUser = 'DELETE FROM avatars WHERE avatars.id = ?'
    
    const currentAvatar = await asyncQuery(selectAvatar, [id])
    
    if(currentAvatar[0].avatar_id !== defaultAvatarId) {
      const path = `public/avatars/${currentAvatar[0].url}`
        fs.unlink(path, async (err)=> {
            if (err) throw err;
            const isDeleted = await asyncQuery(deleteAvatarUser, [currentAvatar[0].avatar_id]);
            return true
        })
    } else {
        return true
    }
}


const deleteImages = async (id) => {
    const selectImages = 'SELECT images.id, images.url FROM images JOIN posts ON posts.image_id = images.id JOIN users ON users.id = posts.user_id WHERE users.id = ?'
    const deleteImage = 'DELETE FROM images WHERE id = ?'
    
    const images = await asyncQuery(selectImages, [id]);
    
    if(images[0]) {
        for(let i = 0;  i<= images.length; i++){
            if(i === images.length){
                return true
            } else {
                const path = `public/img/${images[i].url}`
                fs.unlink(path, async (err)=> {
                    if (err) throw err;
                    const deleted = await asyncQuery(deleteImage, [images[i].id])
                })
            }
        }
    } else {
        return true
    }
}