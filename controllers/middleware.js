import parseurl from 'parseurl';
import {verifyToken} from './token.js'

const ADMIN = 'admin'
const USER = 'user'

const protectedPath = (pathname) => {
    const adminPath = ['admin/add-categorie'];
    const userPath = ['disconnect', 'profile','modify-profile', 'upload-avatar', 'remove-avatar', 'delete-account', 'add-post', 'follow-categories', 'get-categories', 'get-mycategories', 'get-homefeed', 'get-categoryfeed', 'verify-vote', 'get-score', 'upvote', 'downvote', 'annul-vote', 'delete-post'];
    
    const protectedAdmin = adminPath.includes(pathname)
    const protectedUser = userPath.includes(pathname)
    
    if(protectedAdmin){
        return ADMIN
    } else if(protectedUser){
        return USER
    } else {
        return false
    }
}

const accesAutorized = (pathname,userData) => {
    if(protectedPath(pathname) === ADMIN){
        if(userData){
            return userData.isAdmin
        }
        return false
    } else if(protectedPath(pathname) === USER) {
        if(userData){
            return userData.user
        }
        return false
    } else {
        return true
    }
}

const middleware = async (req, res, next) => {
    let pathname = parseurl(req).pathname.split('/')[2];
    // console.log(pathname)
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null
    const userData = await verifyToken(token)
    if(accesAutorized(pathname,userData)){
        next()
    } else {
        res.json({response:false, msg:'acces denied'})
    }
}

export default middleware