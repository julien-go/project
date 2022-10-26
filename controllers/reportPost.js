import {pool} from '../config/database.js';

const reportPost = (req, res) => {
    const postId = req.body.postId
    const userId = req.body.userId
    const username = req.body.username
    const msg = req.body.msg
    
    // const selectPost = 'SELECT posts.id, posts.text_content, DATE_FORMAT(posts.publication_date,"%d/%m/%Y %H:%i") AS publication_date, users.username, users.id AS user_id, users.avatar_id, avatars.url AS avatar_url ,posts_scores.score, posts.image_id, images.url FROM posts LEFT JOIN users ON users.id = posts.user_id LEFT JOIN posts_categories ON posts_categories.post_id = posts.id LEFT JOIN categories ON categories.id = posts_categories.categorie_id LEFT JOIN avatars ON avatars.id = users.avatar_id LEFT JOIN posts_scores ON posts_scores.post_id = posts.id LEFT JOIN images ON images.id = posts.image_id WHERE posts.id = ?'
    const reportRequest = 'INSERT INTO reported_posts (post_id, user_id, report_message, report_date) VALUES (?,?,?,?)'
    
    
    pool.query(reportRequest, [postId, userId, msg, new Date()], (err, report, fields) => {
        if (err) throw err
        console.log(report)
        res.json({response: true})
    })
}

export default reportPost;