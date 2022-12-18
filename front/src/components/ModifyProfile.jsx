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
        if (!verifyLength(email, 255)){
            setErrorMsg('Email : Trop de caractères')
        } else {
            if (!verifyLength(username, 20)){
            setErrorMsg('Nom : Trop de caractères')
            } else {
                if(username.includes(' ')){
                    setErrorMsg(`Les espaces ne sont pas autorisés dans le nom d'utilisateur`)
                } else {
                    if(!checkSpecialCharacters(username)){
                        setErrorMsg(`Les caractères spéciaux ne sont pas autorisés dans le nom d'utilisateur`)
                    } else {
                        if(!checkRegExEmail(email)){
                            setErrorMsg(`Email: Format non valide`)
                        } else {
                            if(state.username.toLowerCase() !== username || state.email !== email){
                            axios.post(`${BASE_URL}/modify-profile`, {
                                username,
                                email,
                                currentUsername: currentUser.username,
                                id: currentUser.id
                            })
                            .then((res) =>{
                                if (res.data.errorMsg !== ''){
                                    setErrorMsg(res.data.errorMsg);
                                } else {
                                    setErrorMsg('')
                                    localStorage.setItem('jwtToken', res.data.token)
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
                            Nom d'utilisateur
                            <input type='text' name='username' maxLength='20' autoComplete='username' value={username} onChange= {(e) => setUsername(e.target.value)} required/>
                        </label>
                        <label name='email'>
                            Email
                            <input type='email' name='email' maxLength='255' value={email} onChange= {(e) => setEmail(e.target.value)} required/>
                        </label>
                    <input className='action_btn' type='submit' value='Modifier'/>
                </form>
            </div>
        </React.Fragment>
        )
}

export default ModifyProfile;