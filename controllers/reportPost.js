import {pool} from '../config/database.js';

const reportPost = (req, res) => {
    const postId = req.body.postId
    const userId = req.body.userId
    const username = req.body.username
    const msg = req.body.msg
    
    const reportRequest = 'INSERT INTO reported_posts (post_id, user_id, report_message, report_date) VALUES (?,?,?,?)'
    
    
    pool.query(reportRequest, [postId, userId, msg, new Date()], (err, report, fields) => {
        if (err) throw err
        console.log(report)
        res.json({response: true})
    })
}

export default reportPost;