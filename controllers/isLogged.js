import {generateToken, verifyToken} from './token.js'

const isLogged = async (req,res) => {
    const userData = await verifyToken(req.body.token)
    if(userData){
        
        const token = await generateToken(userData)
        res.json({response:true, logged:userData.user, admin:userData.isAdmin, token, username:userData.username, id: userData.id, email: userData.email})
    } else {
        res.json({response:false})
    }
};

export default isLogged;