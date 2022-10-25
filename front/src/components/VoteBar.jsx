import {Fragment, useContext, useState, useEffect} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios';
import {ImArrowUp , ImArrowDown} from "react-icons/im";

/*
1 - 





*/

const VoteBar = (props) => {
    
    const [vote, setVote] = useState({voted: false, type: ''})
    const [score, setScore] = useState(0);
    const userId = props.user_id
    const postId = props.post_id
    
    const upSelectedColor = 'green vote_btn';
    const downSelectedColor = 'red vote_btn';
    const notSelectedColor = 'grey vote_btn';
    
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
            if(res.data.response){
                // console.log(res.data.vote.name)
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
        const currentScore = score
        if(vote.voted){
            if(vote.type === 'up'){
                annulVote()
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

    const downVote = (e) => {
        e.preventDefault()
        const currentScore = score
        if(vote.voted){
            if(vote.type === 'down'){
                annulVote()
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
    
    const annulVote = () => {
        // console.log('annuler')
        axios.post(`${BASE_URL}/annul-vote`, {
                userId,
                postId,
                score,
                vote
            })
            .then((res)=>{
                if(res.data.response){
                    setScore(res.data.newScore)
                    setVote({voted: false, type: ''})
                }
            })
            .catch((err)=> {
                console.log(err)
            })
    }
    
    useEffect(()=> {
        verifyVote()
    }, [])
    
    useEffect(()=> {
        // console.log(vote)
    })
    return (
        <Fragment>
            <p className='bloc_score'>SCORE : <span className='score'>{score}</span></p>
            <div className='vote_buttons_container'>
                    <button onClick={(e) => upVote(e)} className={vote.type === 'up' ? upSelectedColor : notSelectedColor}>
                        <ImArrowUp className='up_arrow'/>
                    </button>
                    <button onClick={(e) => downVote(e)} className={vote.type === 'down' ? downSelectedColor : notSelectedColor}>
                        <ImArrowDown className='down_arrow'/>
                    </button>
            </div>

        </Fragment>
    )
}

export default VoteBar