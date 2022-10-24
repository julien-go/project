import {pool} from '../../config/database.js';

const addCategorie = (req, res) => {
    
    const addCat = 'INSERT INTO categories (name, description) VALUES (?,?)'
    console.log(req.body)
    
    pool.query(addCat, [req.body.name, req.body.descript], (error, categorie, fields) => {
        if (error) throw error;
        
        res.json({response: true})
    })
}

export default addCategorie;