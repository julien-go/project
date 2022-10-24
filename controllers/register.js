import {pool} from '../config/database.js';
import bcrypt from 'bcrypt';
import verifyLength from '../components/verifyLength/index.js';
import {checkSpecialCharacters} from '../components/regEx/index.js';
import {defaultAvatarId} from '../config/defaultAvatar.js'
import {generateResponse} from "../controllers/login.js"

const registerUser = (req, res) => {
    // console.log(req.body)
    const newUser = 'INSERT INTO users (username, email, avatar_id, password, role_id, registration_date) VALUES (?,?,?,?,2,?)';
    const getId = 'SELECT id FROM users WHERE username = ?';
    const compareEmail = 'SELECT * FROM users WHERE email = ?';
    const compareUsername = 'SELECT * FROM users WHERE username = ?';
    const saltRound = 10;
    
    if (!verifyLength(req.body.email, 255) || (!verifyLength(req.body.username, 20))){
        res.json({response:false, errorMsg: 'Too many characters in an input'})
            return;
    } else {
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
                            if(!checkSpecialCharacters(req.body.username)) {
                                res.json({response:false, errorMsg: ` Special characters not allowed in username`})
                                return;
                            }
                                bcrypt.hash(req.body.password, saltRound, (err, hash) => {
                                    if (err) throw err;

                                    let params = [req.body.username.toLowerCase(), req.body.email, defaultAvatarId, hash, new Date()]
                                    pool.query(newUser, params, (err, user, fields) => {
                                        if (err) throw err
                                        
                                        pool.query(getId, [req.body.username.toLowerCase()], async (err, result, fields) => {
                                            if (err) throw err;
                                            const userData = {username: req.body.username.toLowerCase(), email: req.body.email, id: user.insertId, role_id: 2}
                                            const passwordMatch = true;
                                            const response = await generateResponse(userData, passwordMatch)
                                            res.json({...response})
                                        })
                                    })
                                })
                        }
                    })
                }
            })
    }
}

export default registerUser;