import pool from '../config/database.js';
import bcrypt from 'bcrypt';
import session from 'express-session';

const loginUser =  (req, res) => {
    console.log(req.body)
        
        const checkUser = 'SELECT password FROM users WHERE email = ?';
        
        pool.query(checkUser, [req.body.email], (err, user, fields) => {
            if (err) throw err;

            if (user[0].password) {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) throw err
                    
                    if(result) {
                        console.log('Vous êtes connecté')
                        res.json({response:true})
                        
                    } else {
                        console.log('Erreur de connexion')
                    
                        res.json({response:false})
                    }
                })
            }
        })
}

export default loginUser;