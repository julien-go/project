import {pool} from '../../config/database.js';

const addCategorie = (req, res) => {
    //Ajout d'une nouvelle catégorie dans la bdd
    const addCat = 'INSERT INTO categories (name, description) VALUES (?,?)'
    pool.query(addCat, [req.body.name, req.body.descript], (error, categorie, fields) => {
        if (error) throw error;
        
        res.json({response: true})
    })
}

export default addCategorie;