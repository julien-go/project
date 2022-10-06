import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from 'axios';
import {AppContext} from '../reducer/reducer'
import {verifyLength} from '../utils/utils.js'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    
    const [state, dispatch] = React.useContext(AppContext)

    const submitLogin = (e) => {
        e.preventDefault();
            if (!verifyLength(email, 255)){
                setErrorMsg('connection error')
            } else {
            axios.post(`${BASE_URL}/login`, {
                email,
                password
            })
            .then((res) =>{
                if (res.data.errorMsg !== ''){
                    setErrorMsg(res.data.errorMsg);
                } else {
                    setErrorMsg('')
                    if(res.data.isAdmin == true){
                        dispatch({type: 'ISADMIN'})
                    }
                    dispatch({type: 'LOGIN', payload: {id: res.data.id, username: res.data.username, email: res.data.email}})
                    navigate("/", {replace: true});
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <React.Fragment>
            <h1>Connexion</h1>
            {errorMsg !== '' && <p className='form_error_msg'>{errorMsg}</p>}
            <form onSubmit={submitLogin}>
                <div>
                    <label name='email'>
                        Email
                        <input type='mail' name='email' maxLength='255' value={email} onChange= {(e) => setEmail(e.target.value)} required/>
                    </label>
                </div>
                <div>
                    <label name='password'>
                        Password
                        <input type='password' name='password' maxLength='255' value={password} autoComplete='current-password' onChange= {(e) => setPassword(e.target.value)} required/>
                    </label>
                </div>
                <input type='submit' value='Submit'/>
            </form>
        </React.Fragment>
        )
}

export default Login;