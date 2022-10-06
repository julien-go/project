import pool from '../config/database.js';
import bcrypt from 'bcrypt';
import verifyLength from '../components/verifyLength/index.js';


const loginUser =  (req, res) => {
    // console.log(req.params)
    
        const checkUser = 'SELECT id, password, username, role_id FROM users WHERE email = ?';
        
        if (!verifyLength(req.body.email, 255)){
            res.json({response:false, errorMsg: 'connection error'})
            return;
        } else {
        
            pool.query(checkUser, [req.body.email], (err, user, fields) => {
                if (err) throw err;
                if (!user[0]) {
                    res.json({response:false, errorMsg: 'connection error'})
                    return;
                } else {
                    
                    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                        if (err) throw err
                        if(!result) {
                            res.json({response:false, errorMsg: 'connection error'})
                            return;
                        } else {
                            
                            req.session.username = user[0].username
                            if (user[0].role_id == 1){
                                req.session.isAdmin = true;
                            }
                                
                            res.json({response:true, errorMsg: '', username: req.session.username, email: req.body.email, isAdmin: req.session.isAdmin, id: user[0].id})
                        }
                    })
                }
            })
        }
}

export default loginUser;