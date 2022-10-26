import {pool} from '../../config/database.js';

const getReports = (req, res) => {
    const selectPosts = 'SELECT DISTINCT reported_posts.*, posts.text_content, DATE_FORMAT( posts.publication_date, "%d/%m/%Y %H:%i") AS publication_date, users.username AS post_username, users.id AS post_user_id FROM reported_posts JOIN posts ON posts.id = reported_posts.post_id JOIN users ON users.id = posts.user_id JOIN posts_categories ON posts_categories.post_id = posts.id JOIN avatars ON avatars.id = users.avatar_id JOIN posts_scores ON posts_scores.post_id = posts.id'
    
    pool.query(selectPosts, (err, reports, fields)=> {
        if (err) throw err;
        
        console.log(reports)
        
        res.json({response: true, reports})
    })

}

export default getReports;