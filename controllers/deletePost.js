import {pool} from '../config/database.js';
import fs from 'fs';

const deletePost = (req, res) => {
    
    const removePost = 'DELETE FROM posts WHERE id = ?';
    const removeImg = 'DELETE FROM images WHERE id = ?';
    const postId = req.body.postId
    const image = req.body.image 
    
    // On supprime le post de la bdd
    pool.query(removePost, [postId], (err, removed, fields)=> {
        if (err) throw err
        if(image === undefined){
            res.json({response: true})
        } else {
            // Si il y a une image, on la supprime de la bdd
            pool.query(removeImg, [image.image_id], (err, deletedImg, fields)=> {
                if (err) throw err
                
                const path = `public/img/${image.url}`
                // On supprime l'image du dossier public/img
                fs.unlink(path, (err)=> {
                    if (err) throw err;
                    res.json({response: true});
                })
            })
        }
    })
}

export default deletePost;