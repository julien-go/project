import {pool, asyncQuery} from '../config/database.js';
import verifyLength from '../components/verifyLength/index.js';
import {checkSpecialCharacters, checkRegExEmail} from '../components/regEx/index.js';
import {generateResponse} from "../controllers/login.js"

const verifyUsername = async (name, id) => {
    const compareUsername = 'SELECT id FROM users WHERE username = ? AND id != ?';
    
    const result = await asyncQuery(compareUsername,[name, id])
    if(result[0]){
        return false
    } else {
        return true
    }
}

const verifyEmail = async (email, id) => {
    const compareEmail = 'SELECT id FROM users WHERE email = ? AND id != ?'
    
    const result = await asyncQuery(compareEmail,[email, id])
    if(result[0]){
        return false
    } else {
        return true
    }
}

const asyncVerifyLength = async (input, maxLength) => {
    
    const result = await verifyLength(input, maxLength)
    if(!result){
        return false
    } else {
        return true
    }
}

const verifyUsernameCharacters = async (name) => {
    
    const result = await checkSpecialCharacters(name)
    
    if(!result || name.includes(' ')){
        return false
    } else {
        return true
    }
}

const verifyEmailRegex = async (email) => {
    
    const result = await checkRegExEmail(email)
    if(!result){
        return false
    } else {
        return true
    }
}


const modifyProfileInfos = async (req, res) => {
    const updateInfos = 'UPDATE users SET username = ?, email = ? WHERE id = ?'
    
    const username = req.body.username.toLowerCase();
    
    // console.log(req.body);
    const nameNotTooLong = await asyncVerifyLength(username, 20);
    const emailNotTooLong = await asyncVerifyLength(req.body.email, 255)
    
    if(!nameNotTooLong || !emailNotTooLong){
        res.json({response:false, errorMsg: 'Too many characters in an input'})
    } else {
        
        const usernameIsValid = await verifyUsernameCharacters(username)
        
        if(!usernameIsValid){
            res.json({response:false, errorMsg: `Empty spaces and/or special characters are not allowed in username`})   
        } else {
            
            const emailIsValid = await verifyEmailRegex(req.body.email)
            if(!emailIsValid){
                res.json({response:false, errorMsg: `Email format not valid`})   
            } else {
                
                const nameAvailable = await verifyUsername(username, req.body.id);
                if(!nameAvailable){
                    res.json({response:false, errorMsg: 'This username is already taken'})
                } else {
                    
                    const emailAvailable = await verifyEmail(req.body.email, req.body.id);
                    if(!emailAvailable){
                        res.json({response:false, errorMsg: 'This email is already taken'})
                    } else {
                        pool.query(updateInfos, [username, req.body.email, req.body.id], async (err, user, fields) => {
                            if (err) throw err
                            const userData = {username: username, email: req.body.email, id: req.body.id, role_id: 2}
                            const response = await generateResponse(userData, true)
                            
                            res.json({...response, errorMsg: ''})
                        })
                    }
                }
            }
        }
    }
}

export default modifyProfileInfos;