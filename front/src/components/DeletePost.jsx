import {Fragment, useContext, useState, useEffect} from 'react'
import { ImBin, ImCross } from "react-icons/im";
import BASE_URL from "../config.js"
import axios from 'axios'

const DeletePost = (props) => {
    
    const [active, setActive] = useState(false)
    
    const removePost = (e) => {
        // On envoie une requête à l'api qui supprime le post
        e.preventDefault()
        if(props.postId){
            axios.post(`${BASE_URL}/delete-post/`, {
                postId: props.postId,
                image: props.img
            })
            .then((res)=> {
                if(res.data.response){
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
            <div className='delete_container'>
                <button className='delete_btn' onClick={(e) => setActive(true)}>
                    <ImBin/>
                </button>  
                {active &&
                    <div className='modal_container'>
                        <div className='report_form'>
                            <button className='close_modal_btn' onClick={() => setActive(false)}>
                                <ImCross/>
                            </button>
                            <h3 className='bloc_title'>Voulez-vous supprimer le post ?</h3>
                            <form onSubmit={(e) => removePost(e)}>
                                <input className='action_btn' type='submit' value='Supprimer'/>
                            </form>
                        </div>                 
                    </div>
                }
            </div>
        </Fragment> 
    )
}

export default DeletePost