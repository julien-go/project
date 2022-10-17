import {Fragment, useContext, useState, useEffect} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios';

const VoteBar = (props) => {
    
    const [vote, setVote] = useState({voted: false, type: ''})
    const [score, setScore] = useState(0);
    
    const getScore = () => {
        axios.get(`${BASE_URL}/get-score/${props.post_id}`)
        .then((res) => {
            if(res.data.response){
                setScore(res.data.score)
            }    
        })
        .catch((err)=> {
            console.log(err)
        })
    }
    
    const verifyVote = () => {
        axios.get(`${BASE_URL}/verify-vote/${props.user_id}/${props.post_id}`)
        .then((res) => {
            if(res.response){
                setVote({voted: true, type: res.data.vote.name})
            } else {
                setVote({voted: false, type: ''})
            }
            getScore()
        })
        .catch((err)=> {
            console.log(err)
        })
    }
    
    const upVote = (e) => {
        e.preventDefault()
        const userId = props.user_id
        const postId = props.post_id
        const currentScore = score
        if(vote.voted){
            if(vote.type === 'up'){
                annulUpVote()
            }
        } else {
                axios.post(`${BASE_URL}/upvote`, {
                    userId,
                    postId,
                    score
                })
                .then((res)=>{
                    if(res.data.response){
                        setScore(currentScore + 1)
                        setVote({voted: true, type: 'up'})
                        
                    }
                })
                .catch((err)=> {
                    console.log(err)
                })
        }
    }
    
    
    const annulUpVote = () => {
        console.log('annuler')
    }
    
    const downVote = (e) => {
        e.preventDefault()
        const userId = props.user_id
        const postId = props.post_id
        const currentScore = score
        if(vote.voted){
            if(vote.type === 'down'){
                annulDownVote()
            }
        } else {
                axios.post(`${BASE_URL}/downvote`, {
                    userId,
                    postId,
                    score
                })
                .then((res)=>{
                    if(res.data.response){
                        setScore(currentScore - 1)
                        setVote({voted: true, type: 'down'})
                    }
                })
                .catch((err)=> {
                    console.log(err)
                })
        }
    }
    
        const annulDownVote = () => {
        console.log('annuler')
    }
    
    useEffect(()=> {
        verifyVote()
    }, [])
    
    return (
        <Fragment>
            <p>SCORE : {score}</p>
            <form onSubmit={(e) => upVote(e)}>
                <input type='submit' value='+'/>
            </form>
            <form onSubmit={(e) => downVote(e)}>
                <input type='submit' value='-'/>
            </form>
        </Fragment>
    )
}

export default VoteBar