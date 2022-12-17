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
    
    // On vérifie si le nom entré n'est pas trop long
    const nameNotTooLong = await asyncVerifyLength(username, 20);
    const emailNotTooLong = await asyncVerifyLength(req.body.email, 255)
    
    if(!nameNotTooLong){
        res.json({response:false, errorMsg: 'Nom : Trop de caractères'})
    } else {
            if(!emailNotTooLong){
            res.json({response:false, errorMsg: 'Email : Trop de caractères'})
            } else {
        
            const usernameIsValid = await verifyUsernameCharacters(username)
            
            if(!usernameIsValid){
                res.json({response:false, errorMsg: `Les espaces et/ou caractères spéciaux ne sont pas autorisés dans le nom d'utilisateur`})   
            } else {
                
                const emailIsValid = await verifyEmailRegex(req.body.email)
                if(!emailIsValid){
                    res.json({response:false, errorMsg: `Email: Format non valide`})   
                } else {
                    
                    const nameAvailable = await verifyUsername(username, req.body.id);
                    if(!nameAvailable){
                        res.json({response:false, errorMsg: "Ce nom d'utilisateur est déjà pris !" })
                    } else {
                        
                        const emailAvailable = await verifyEmail(req.body.email, req.body.id);
                        if(!emailAvailable){
                            res.json({response:false, errorMsg: "Cette adresse email est déjà prise "})
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
}

export default modifyProfileInfos;