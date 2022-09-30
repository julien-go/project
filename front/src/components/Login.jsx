import React from 'react'
import { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from 'axios';
import {AppContext} from './reducer/reducer'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    
    const [state, dispatch] = React.useContext(AppContext)

    const submit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/login`, {
            email,
            password
        })
        .then((res) =>{
            // console.log(res)
            if (res.data.errorMsg !== ''){
                setErrorMsg(res.data.errorMsg);
            } else {
                setErrorMsg('')
                if(res.data.isAdmin == true){
                    dispatch({type: 'ISADMIN'})
                }
                dispatch({type: 'LOGIN', payload: res.data.username})
                navigate("/", {replace: true});
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <React.Fragment>
            <h1>Connexion</h1>
            {errorMsg !== '' && <p className='form_error_msg'>{errorMsg}</p>}
            <form onSubmit={submit}>
                <div>
                    <label name='email'>
                        Email
                        <input type='mail' name='email' value={email} onChange= {(e) => setEmail(e.target.value)} required/>
                    </label>
                </div>
                <div>
                    <label name='password'>
                        Password
                        <input type='password' name='password' value={password} onChange= {(e) => setPassword(e.target.value)} required/>
                    </label>
                </div>
                <input type='submit' value='Submit'/>
            </form>
        </React.Fragment>
        )
}

export default Login;