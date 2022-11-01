import React from 'react'
import {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from 'axios'
import {AppContext} from '../reducer/reducer'
import {verifyLength, checkRegExEmail, checkSpecialCharacters} from '../utils/utils.js'

const ModifyProfile = () => {
    const [currentUser, setCurrentUser] = useState({id:'', username: ''});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    
    const [state, dispatch] = useContext(AppContext)
    
    const submitModif = (e) => {
        e.preventDefault();
        if (!verifyLength(email, 255) || !verifyLength(username, 20)){
            setErrorMsg('Too many characters on an input')
        } else {
            if(username.includes(' ')){
                setErrorMsg('Empty spaces not allowed in username')
            } else {
                if(!checkSpecialCharacters(username)){
                    setErrorMsg('Special characters not allowed in username')
                } else {
                    if(!checkRegExEmail(email)){
                        setErrorMsg("Email format is not valid")
                    } else {
                        console.log(state.username)
                        if(state.username.toLowerCase() !== username || state.email !== email){
                            console.log(state.username.toLowerCase())
                        axios.post(`${BASE_URL}/modify-profile`, {
                            username,
                            email,
                            currentUsername: currentUser.username,
                            id: currentUser.id
                        })
                        .then((res) =>{
                            // console.log(res)
                            if (res.data.errorMsg !== ''){
                                setErrorMsg(res.data.errorMsg);
                            } else {
                                setErrorMsg('')
                                dispatch({type: 'LOGIN', payload: {id: res.data.id, username: res.data.username, email: res.data.email}})
                                navigate(`/profile/${username}`, {replace: true});
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                        }
                    }
                }
            }
        }
    }
    
    useEffect(() => {
        setCurrentUser({...currentUser, username: state.username, id: state.id})
        setUsername(state.username)
        setEmail(state.email)
    }, [])
    
    return (
        <React.Fragment>
            <h1>Modification des informations du profil</h1>
            <div className='form_container modif_profile_container'>
                {errorMsg !== '' && <p className='form_error_msg'>{errorMsg}</p>}
                <form onSubmit={submitModif}>
                        <label name='username'>
                            Username
                            <input type='text' name='username' maxLength='20' autoComplete='username' value={username} onChange= {(e) => setUsername(e.target.value)} required/>
                        </label>
                        <label name='email'>
                            Email
                            <input type='email' name='email' maxLength='255' value={email} onChange= {(e) => setEmail(e.target.value)} required/>
                        </label>
                    <input className='action_btn' type='submit' value='Submit'/>
                </form>
            </div>
        </React.Fragment>
        )
}

export default ModifyProfile;