import pool from '../config/database.js';

const addCategorie = (req, res) => {
    
    const addCat = 'INSERT INTO categories (name, description) VALUES (?,?)'
    
    // pool.query(addCat, [req.body.name, req.body.descript], (error, categorie, ))
}