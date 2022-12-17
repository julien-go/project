import {pool} from '../config/database.js';
import bcrypt from 'bcrypt';
import verifyLength from '../components/verifyLength/index.js';
import {asyncQuery} from '../config/database.js';
import {generateToken} from "../controllers/token.js"


export const generateResponse = async (userDataSQL,passwordMatch) => {
    // On retourne les information du user si le password match, sinon on retourne response false
    const ADMIN_ROLE_ID = 1
    const isAdmin = userDataSQL.role_id === ADMIN_ROLE_ID
    
    const userData = { 
        username: userDataSQL.username,
        email:userDataSQL.email,
        id: userDataSQL.id,
        user:true,
        isAdmin
    }
    const token = await generateToken(userData)
    const sucessJson = {response:true, isAdmin, token, errorMsg: '', username: userDataSQL.username, email:userDataSQL.email,id: userDataSQL.id}
    const failJson = {response:false, errorMsg:'connection error'}
    return passwordMatch ? sucessJson : failJson
}

const loginUser = (req, res) => {
     
    const checkUser = 'SELECT id, password, username, role_id FROM users WHERE email = ?';
    if (!verifyLength(req.body.email, 255)){
        res.json({response:false, errorMsg: 'Erreur de connexion'})
        return;
    } else {
        // On récupère les informations correspondantes à l'adresse mail fournies
        pool.query(checkUser, [req.body.email], (err, user, fields) => {
            if (err) throw err;
            if (!user[0]) {
                res.json({response:false, errorMsg: 'Erreur de connexion'})
                return;
            } else {
                // On compare le mot de passe fourni et celui de la base de donnée avec bcrypt
                bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
                    if (err) throw err
                    if(!result) {
                        res.json({response:false, errorMsg: 'Erreur de connexion'})
                    } else {
                        const userData = {...user[0], email: req.body.email}
                       
                        const passwordMatch = await bcrypt.compare(req.body.password, userData.password)
                        
                        
                        const response = await generateResponse(userData, passwordMatch)
                        res.json({...response})
                    }
                })
            }
        })
    }
}

export default loginUser;