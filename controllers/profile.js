import pool from '../config/database.js';

const getProfileInfos = (req, res) => {
    
    const getInfos = 'SELECT role_id, email, avatar_id, registration_date FROM users WHERE username = ?'
    const getRole = 'SELECT name FROM roles WHERE id = ?';
    const getAvatar = 'SELECT url FROM avatars WHERE id = ?'
    const currentUsername = req.params.username;
    
    pool.query(getInfos, [currentUsername], (err, user, fields) => {
        if (err) throw err
        console.log(user)
        pool.query(getRole, [user[0].role_id], (err, role, fields)=> {
            if (err) throw err
            console.log(role)
            if(user[0].avatar_id == null){
                res.json({response: true, email: user[0].email, role: role[0].name, avatarPath: '', registration_date: user[0].registrationDate});
            } else {
                pool.query(getAvatar, [user[0].avatar_id], (err, avatar, fields) => {
                    if (err) throw err;
                    res.json({response: true, email: user[0].email, role: role[0].name, avatarPath: avatar[0].url, registrationDate: user[0].registration_date});
                })
            }
        })
    })
}

export default getProfileInfos;