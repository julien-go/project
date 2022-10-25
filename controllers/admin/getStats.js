import {pool} from '../../config/database.js';

const getStats = (req, res) => {
    const selectStats = 'SELECT (SELECT COUNT(*) FROM users) AS usersCount, (SELECT COUNT(*) FROM posts) AS postsCount, (SELECT COUNT(*) FROM posts WHERE publication_date BETWEEN DATE_SUB(?, INTERVAL 1 DAY) AND ?) AS postsToday'
    
    
    pool.query(selectStats, [new Date(), new Date()], (err, stats, fields) => {
        if (err) throw err
        console.log(stats)
        res.json({response: true, stats: stats[0]})
    })
}

export default getStats