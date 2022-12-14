import {pool} from '../config/database.js';

const getProfileInfos = (req, res) => {
    
    
    const getInfos = 'SELECT roles.name AS role, email, avatars.url, DATE_FORMAT( registration_date, "%d/%m/%Y %H:%i") AS registration_date FROM users JOIN roles ON users.role_id = roles.id JOIN avatars ON users.avatar_id = avatars.id WHERE username = ?'
    
    const getStats = 'SELECT COUNT(posts.id) AS count FROM posts JOIN users ON users.id = posts.user_id WHERE users.username = ?'
    const currentUsername = req.params.username;
    
    pool.query(getInfos, [currentUsername], (err, user, fields) => {
        if (err) throw err
        pool.query(getStats, [currentUsername], (err, postCount, fields)=> {
            if (err) throw err;
                if(!user[0]){
                    res.json({response: false, email: '', role: '', avatarPath: '', registrationDate: ''});
                } else {
                    res.json({response: true, email: user[0].email, role:user[0].role, avatarPath: user[0].url, registrationDate: user[0].registration_date, postCount: postCount[0].count});
                }
        })
        

    })
}

export default getProfileInfos;