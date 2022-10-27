import {pool} from '../config/database.js';
import verifyLength from '../components/verifyLength/index.js';
import {checkSpecialCharacters} from '../components/regEx/index.js';

const modifyProfileInfos = (req, res) => {
    const updateInfos = 'UPDATE users SET username = ?, email = ? WHERE id = ?'
    const compareEmail = 'SELECT id FROM users WHERE email = ?'
    const compareUsername = 'SELECT id FROM users WHERE username = ?';
    console.log(req.body);
    
    
    if (!verifyLength(req.body.email, 255) || (!verifyLength(req.body.username, 20))){
        res.json({response:false, errorMsg: 'Too many characters in an input'})
    } else {
            pool.query(compareEmail, [req.body.email], (error, users1, fields) => {
                if (error) throw error;
                console.log(users1)
            
                if(users1.id){
                    if(users1.id !== req.body.id){
                        console.log('2')
                    res.json({response:false, errorMsg: 'This email is already taken'})
                    }
                } else {
                    
                    pool.query(compareUsername, [req.body.username], (error, users2, fields) => {
                        if (error) throw error;
                
                        if(users2.id){
                            if(users2.id !== req.body.id) {
                            res.json({response:false, errorMsg: 'This username is already taken'})
                            }
                        } else {
                            if(req.body.username.includes(' ')) {
                                res.json({response:false, errorMsg: 'Empty spaces not allowed in username'})
                            } else {
                                if(!checkSpecialCharacters(req.body.username)) {
                                    res.json({response:false, errorMsg: ` Special characters not allowed in username`})
                                } else {
                                    let params = [req.body.username.toLowerCase(), req.body.email, req.body.id]
                                        pool.query(updateInfos, params, (err, user, fields) => {
                                            if (err) throw err

                                            // console.log(req.session.username)
                                            res.json({response:true, errorMsg: '', username: req.body.username, email: req.body.email, isAdmin: false, id: req.body.id})
                                        })
                                }
                            }
                        }
                    
                    })
                }
            })
    }
}  

export default modifyProfileInfos;