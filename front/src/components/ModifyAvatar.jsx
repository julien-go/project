import React from 'react'
import {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from 'axios'
import {AppContext} from '../reducer/reducer.js'

const ModifyAvatar = () => {
    const [state, dispatch] = React.useContext(AppContext);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    
    const addNewAvatar = (e) => {
        e.preventDefault()
        const username = state.username
        const files = e.target.avatar.files;
        // console.log(files)
        const dataFile = new FormData();
        dataFile.append('username', state.username)
        dataFile.append('files', files[0], files[0].name)
        
        axios.post(`${BASE_URL}/upload-avatar`, dataFile)
        .then((res)=> {
            // console.log(res)
            setMsg(res.data.msg);
            if(res.data.response){
                navigate(`/profile/${state.username}`)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    const removeCurrentAvatar = (e) => {
        e.preventDefault()
    }
    
    return (
        <React.Fragment>
            <h1>Ajouter/Modifier l'avatar</h1>
            {msg !== '' && <p>{msg}</p>}
            <form onSubmit={addNewAvatar} encType="multipart/form-data">
                <label name='avatar'>
                    <input type='file' name='avatar' required/>
                    <input type='submit' value='Submit'/>
                </label>
            </form>
            <hr/>
            <button>Remove current avatar</button>
            
        </React.Fragment>
    )
}

export default ModifyAvatar