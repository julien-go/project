import {Fragment, useContext, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { ImCross } from "react-icons/im";
import {AppContext} from '../reducer/reducer'
import BASE_URL from "../config.js"
import axios from 'axios'

const DeletePost = (props) => {
    const navigate = useNavigate()
    
    const removePost = (e) => {
        if(props.postId){
            axios.post(`${BASE_URL}/delete-post/`, {
                postId: props.postId,
                image: props.img
            })
            .then((res)=> {
                if(res.data.response){
                    // console.log(res.data.postsId)
                    props.refresh()
                }
            })
            .catch((err)=> {
                console.log(err)
            })
        }
    }

    
     return (
        <Fragment>
            <button className='delete_btn' onClick={(e) => removePost(e)}>
                <ImCross/>
            </button>
        </Fragment> 
    )
}

export default DeletePost