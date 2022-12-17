import React from 'react'
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from 'axios'
import {AppContext} from '../reducer/reducer'
import {verifyLength, checkRegExEmail, checkRegExPassword} from '../utils/utils.js'

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const [state, dispatch] = React.useContext(AppContext)
    
    const submitRegister = (e) => {
        e.preventDefault();
        if(password !== secondPassword){
            setErrorMsg('Les mots de passe ne correspondent pas')
        } else {
           if (!verifyLength(email, 255)){
            setErrorMsg('Email : Trop de caractères')
            } else {
                if (!verifyLength(username, 20)){
                    setErrorMsg('Nom : Trop de caractères')
                } else {
                    if(username.includes(' ')){
                        setErrorMsg("Les espaces ne sont pas autorisés dans le nom d'utilisateur")
                    } else {
                        if(!checkRegExPassword(password)){
                            setErrorMsg('Le mot de passe doit faire minimum 8 caractères et doit contenir au moins une majuscule, une minuscule, un caractère spéciale et un chiffre');
                        } else {
                            if(!checkRegExEmail(email)){
                                setErrorMsg("Email: Format Non Valide")
                            } else {
                                axios.post(`${BASE_URL}/register`, {
                                    username,
                                    email,
                                    password
                                })
                                .then((res) =>{
                                    if (res.data.errorMsg !== ''){
                                        setErrorMsg(res.data.errorMsg);
                                    } else {
                                        setErrorMsg('')
                                        localStorage.setItem('jwtToken', res.data.token)
                                        axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token
                                        dispatch({type: 'LOGIN', payload: {id: res.data.id, username: res.data.username, email: res.data.email}})
                                        navigate("/my-categories", {replace: true});
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
    
    return (
        <React.Fragment>
            <div className='form_container register_container'>
                <h1>Inscription</h1>
                {errorMsg !== '' && <p className='form_error_msg'>{errorMsg}</p>}
                <form onSubmit={submitRegister}>
                        <label name='username'>
                            Nom d'utilisateur
                            <input type='text' name='username' maxLength='20' autoComplete='username' value={username} onChange= {(e) => setUsername(e.target.value)} required/>
                        </label>
                        <label name='email'>
                            Email
                            <input type='email' name='email' maxLength='255' value={email} onChange= {(e) => setEmail(e.target.value)} required/>
                        </label>
                        <label name='password'>
                            Mot de passe
                            <input type='password' name='password' maxLength='255' value={password}  autoComplete='new-password' onChange= {(e) => setPassword(e.target.value)} required/>
                        </label>
                        <label name='secondpassword'>
                            Verification du mot de passe
                            <input type='password' name='secondpassword' maxLength='255' value={secondPassword}  autoComplete='new-password' onChange= {(e) => setSecondPassword(e.target.value)} required/>
                        </label>
                    <input type='submit' value='Submit'/>
                </form>
            </div>
        </React.Fragment>
        )
}

export default Register;