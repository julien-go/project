import {pool} from '../config/database.js';
import bcrypt from 'bcrypt';
import verifyLength from '../components/verifyLength/index.js';
import {asyncQuery} from '../config/database.js';
import {generateToken} from "../controllers/token.js"

// const getUserData = async (email) => {
//     let getUserSQL = "SELECT * FROM users WHERE email = ?";
//     const userDataSQL = await asyncQuery(getUserSQL,[email])
//     return userDataSQL[0]
// }
export const generateResponse = async (userDataSQL,passwordMatch) => {
    // console.log(userDataSQL)
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
                    bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
                        if (err) throw err
                        if(!result) {
                            res.json({response:false, errorMsg: 'connection error'})
                            return;
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