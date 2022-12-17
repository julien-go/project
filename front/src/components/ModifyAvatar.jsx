import React from 'react'
import {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from 'axios'
import {AppContext} from '../reducer/reducer.js'

const ModifyAvatar = () => {
    const [state, dispatch] = React.useContext(AppContext);
    const [msg, setMsg] = useState('');
    const [deleteMsg, setDeleteMsg] = useState('');
    const navigate = useNavigate();
    
    const addNewAvatar = (e) => {
        e.preventDefault()
        const files = e.target.avatar.files;
        const dataFile = new FormData();
        dataFile.append('username', state.username)
        dataFile.append('files', files[0], files[0].name)
        
        axios.post(`${BASE_URL}/upload-avatar`, dataFile)
        .then((res)=> {
            setMsg(res.data.msg);
            if(res.data.response){
                navigate(`/profile/${state.username}`)
            } else {
                setMsg(res.data.msg);
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    const removeCurrentAvatar = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/remove-avatar`, {
            id: state.id
        })
        .then((res)=>{
            if (res.data.response){
                navigate(`/profile/${state.username}`)
            } else {
                setDeleteMsg("Pas d'avatar à supprimer")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    return (
        <React.Fragment>
        <div className='form_container modify_avatar'>
            <h1>Ajouter/Modifier l'avatar</h1>
            {msg !== '' && <p>{msg}</p>}
            <form onSubmit={addNewAvatar} encType="multipart/form-data">
                <label name='avatar'>
                    <input className='input_file' type='file' name='avatar' required/>
                    <input type='submit' value="Ajouter/Changer l'avatar"/>
                </label>
            </form>
             <div className='separator'></div>
             <div>
                {deleteMsg !== '' && <p>{deleteMsg}</p>}
            <button className='action_btn' onClick={removeCurrentAvatar}>Supprimer l'avatar</button>
             </div>
         </div>
        </React.Fragment>
    )
}

export default ModifyAvatar