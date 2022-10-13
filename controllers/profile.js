import pool from '../config/database.js';

const getProfileInfos = (req, res) => {
    
    
    const getInfos = 'SELECT roles.name, email, avatars.url, DATE_FORMAT( registration_date, "%D %b %Y" ) AS registration_date FROM users JOIN roles ON users.role_id = roles.id JOIN avatars ON users.avatar_id = avatars.id WHERE username = ?'
    const currentUsername = req.params.username;
    
    pool.query(getInfos, [currentUsername], (err, user, fields) => {
        if (err) throw err
        // console.log(user)
        
        if(!user[0]){
            res.json({response: false, email: '', role: '', avatarPath: '', registrationDate: ''});
        } else {
            res.json({response: true, email: user[0].email, role:user[0].name, avatarPath: user[0].url, registrationDate: user[0].registration_date});
        }
    })
}

export default getProfileInfos;