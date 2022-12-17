import {pool} from '../../config/database.js';


const deleteReport = 'DELETE FROM reported_posts WHERE id = ?'

export const annulReport = (req, res)=> {
    
    const reportId = req.body.id;
    pool.query(deleteReport, [reportId], (err, result, fields) => {
        if (err) throw err
        res.json({response: true})
    })
}

export const deletePostReport= (req, res)=> {
    const deletePost = 'DELETE FROM posts WHERE id = ?'
    const reportId = req.body.reportId;
    const postId = req.body.postId
    
    pool.query(deletePost, [postId], (err, result, fields) => {
        if (err) throw err
        
        pool.query(deleteReport, [reportId], (err, result, fields)=> {
           if (err) throw err
           
           res.json({response: true}) 
        })
    })
}