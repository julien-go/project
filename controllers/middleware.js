import parseurl from 'parseurl';
import {verifyToken} from './token.js'

const ADMIN = 'admin'
const USER = 'user'

const protectedPath = (pathname) => {
    
    // On check si l'url de l'api est protégé, si oui, pour admin ou user
    const adminPath = ['admin/add-categorie', 'admin/get-stats', 'admin/get-reports', 'admin/annul-report', 'admin/delete-post-report'];
    const userPath = ['profile', 'get-user-posts', 'modify-profile', 'upload-avatar', 'remove-avatar', 'delete-account', 'add-post', 'follow-categories', 'unfollow-categories', 'get-categories', 'get-mycategories', 'get-homefeed', 'get-categoryfeed', 'get-hall-of-fame', 'verify-vote', 'get-score', 'upvote', 'downvote', 'annul-vote', 'delete-post', 'report-post'];
    
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
    
    // On check si l'utilisateur est autorisé à faire une requête (Admin ou User)
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
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null
    const userData = await verifyToken(token)
    if(accesAutorized(pathname,userData)){
        next()
    } else {
        res.json({response:false, msg:'Accès refusé'})
    }
}

export default middleware