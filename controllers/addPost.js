import {pool} from '../config/database.js';
import verifyLength from '../components/verifyLength/index.js';
import checkAcceptedExtensions from '../components/checkExtension/index.js'
import fs from 'fs';
import formidable from 'formidable';

const addPost = (req, res) => {
    const insertPost = "INSERT INTO posts (user_id, text_content, publication_date) VALUES (?, ?, ?)" 
    const insertScore = 'INSERT INTO posts_scores (post_id, score) VALUES (?, 0)'
    const insertPostCategorie = 'INSERT INTO posts_categories (post_id, categorie_id) VALUES (?, ?)'
    const insertImg = 'INSERT INTO images (url) VALUES (?)' 
    const updatePostImg = 'UPDATE posts SET image_id = ? WHERE id = ?'
    
    const form = formidable({keepExtensions: true});
    const maxSize = 2000000;
    const acceptedExtensions = ['jpeg', 'jpg', 'png', 'gif'];
    
    form.parse(req, (err, fields, files) => {
        if (err) throw err;
        const categories = fields.categories.split(',');
        const textContent = fields.textContent;
        
        const userId = fields.userId;
        
        if(!categories[0]){
                res.json({response: false, msg: 'Pas de catégorie sélectionnée'})
        } else {
            if(!verifyLength(textContent, 500)){
                res.json({response: false, msg: 'Trop de caractères (max: 500)'})
            } else {
                if(textContent.toString().length < 20){
                    res.json({response: false, msg: 'Pas assez de caractères (min: 20)'})
                } else {
                    // On ajoute le post dans la base de donnée
                    pool.query(insertPost, [userId, textContent, new Date()], (err, post, fields) => {
                        if (err) throw err;
                        const postId = post.insertId;
                        
                        for(let i=0; i < categories.length; i++){
                            pool.query(insertPostCategorie, [postId, categories[i]], (err, cats, fields) => {
                                if (err) throw err;
                            })
                        }
                        // On ajoute le score du post à 0 dans la bdd
                        pool.query(insertScore, [postId], async (err, score, fields) => {
                            if (err) throw err;
                            if(!files.files){
                                res.json({response: true})
                            } else {
                                const file = files.files;
                                const newFilename = file.newFilename;
                                const oldPath = file.filepath;
                                const newPath = `public/img/${newFilename}`;
                                const isExtensionValid = await checkAcceptedExtensions(file, acceptedExtensions);
                                    
                                if(!isExtensionValid){
                                    res.json({response: false, msg: 'Problème de format du fichier'})
                                } else {
                                    if(file.size > maxSize) {
                                        res.json({response: false, msg: 'Image trop volumineuse (max: 2mo)'}) 
                                    } else {
                                        
                                    // On copy le fichier uploadé dans le dossier public/img
                                    fs.copyFile(oldPath, newPath, (err)=> {
                                        if (err) throw err;
                                        
                                        // On ajoute l'url de le chemin dans la base de données
                                        pool.query(insertImg, [newFilename], (err, img, fields) =>{
                                            if (err) throw err;
                                            const imgId = img.insertId;
                                            
                                            // On update le post en lui ajoutant l'id de l'image
                                            pool.query(updatePostImg, [imgId, postId], (err, result, fields) => {
                                                if (err) throw err;
                                                res.json({response: true})
                                            })
                                        })
                                    })
                                }
                                }
                            }
                        })
                    })
                }
            }
        }
    })
}

export default addPost;

