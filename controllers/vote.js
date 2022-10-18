import pool from '../config/database.js';

export const getScore = (req, res) => {
    const selectScore = 'SELECT score FROM posts_scores WHERE post_id = ?'
    const postId = req.params.postid;
        
    pool.query(selectScore, [postId], (err, score, fields)=> {
        if (err) throw err
        res.json({response: true, score: score[0].score})
    })
}

export const verifyVote = (req, res) => {
    
    const selectVote = 'SELECT votes.type_id, votes_types.name FROM votes JOIN votes_types ON votes_types.id = votes.type_id WHERE votes.user_id = ? AND votes.post_id = ?'

    const userId = req.params.userid;
    const postId = req.params.postid;
    
        pool.query(selectVote, [userId, postId], (err, votes, fields) => {
            if (err) throw err;
            if(votes[0]){
                res.json({response: true, vote: votes[0]})
            } else {
                res.json({response: false})
            }
        })  
}

export const upVote = (req, res) => {
    const addUpVote = 'INSERT INTO votes (user_id, post_id, type_id) VALUES (?,?,1)'
    const plusOne = 'UPDATE posts_scores SET score = ? WHERE post_id = ?'

    const userId = req.body.userId
    const postId = parseInt(req.body.postId)
    const newScore = req.body.score + 1;

    pool.query(addUpVote, [userId, postId], (err, upvote, fields) => {
        if (err) throw err
        
        pool.query(plusOne, [newScore, postId], (err, plus, fields)=> {
            if (err) throw err
            res.json({response: true})
        })
    })
}

export const downVote = (req, res) => {
    const addDownVote = 'INSERT INTO votes (user_id, post_id, type_id) VALUES (?,?,2)'
    const oneLess = 'UPDATE posts_scores SET score = ? WHERE post_id = ?'

    const userId = req.body.userId
    const postId = parseInt(req.body.postId)
    console.log(postId)
    const newScore = req.body.score - 1;
    console.log(newScore)

    pool.query(addDownVote, [userId, postId], (err, downvote, fields) => {
        if (err) throw err
        
        pool.query(oneLess, [newScore, postId], (err, plus, fields)=> {
            if (err) throw err
            res.json({response: true})
        })
    })
}

export const annulVote = (req, res) => {
    const deleteVote = 'DELETE FROM votes WHERE user_id = ? AND post_id = ?'
    const updateScore = 'UPDATE posts_scores SET score = ? WHERE post_id = ?'

    const userId = req.body.userId
    const postId = parseInt(req.body.postId)
    const currentScore = req.body.score
    const currentVote = req.body.vote.type
    
    pool.query(deleteVote, [userId, postId], (err, deletedVote, fields) => {
        if (err) throw err
        
        if(currentVote === 'up'){
            const newScore = currentScore - 1;
            pool.query(updateScore, [newScore, postId], (err, updated, fields)=> {
                if (err) throw err
                res.json({response: true, newScore})
            })
        } else if(currentVote === 'down'){
            const newScore = currentScore + 1;
            pool.query(updateScore, [newScore, postId], (err, updated, fields)=> {
                if (err) throw err
                res.json({response: true, newScore})
            })
        }
    })
}