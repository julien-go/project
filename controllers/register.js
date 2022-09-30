import pool from '../config/database.js';
import bcrypt from 'bcrypt';

const registerUser = (req, res) => {
    console.log(req.body)
    
    const newUser = 'INSERT INTO users (username, email, password, role_id, registration_date) VALUES (?,?,?,2,?)'
    const compareEmail = 'SELECT * FROM users WHERE email = ?'
    const compareUsername = 'SELECT * FROM users WHERE username = ?';
    const saltRound = 10;
    
    pool.query(compareEmail, [req.body.email], (error, users, fields) => {
        if (error) throw error;
        
        if(users[0]) {
            res.json({response:false, errorMsg: 'This email is already taken'})
            return;
        } else {
            
            pool.query(compareUsername, [req.body.username], (error, users, fields) => {
                if (error) throw error;
        
                if(users[0]) {
                    
                    res.json({response:false, errorMsg: 'This username is already taken'})
                    return;
                } else {
                    
                    if(req.body.username.includes(' ')) {
                        res.json({response:false, errorMsg: 'Empty spaces not allowed in username'})
                        return;
                    }
                    
                    const regExPassword =/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                    if (regExPassword.test(req.body.password)){
                        
                        bcrypt.hash(req.body.password, saltRound, (err, hash) => {
                            if (err) throw err;
                            
                            let params = [req.body.username.toLowerCase(), req.body.email, hash, new Date()]
                            
                            pool.query(newUser, params, (err, user, fields) => {
                                if (err) throw err
                                
                                req.session.username = req.body.username.toLowerCase()
                                console.log(req.session.username)
                                req.session.isAdmin = false;
                                res.json({response:true, errorMsg: '', isAdmin: false, username: req.session.username})
                            })
                        })
                    } else {
                        res.json({response:false, errorMsg: 'This password is not secure'})
                    }
                    
                }
            })
        }
        
    })
}

export default registerUser;