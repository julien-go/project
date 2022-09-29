import React from 'react'
import { useState } from 'react';
import BASE_URL from "../config.js"
import axios from 'axios';

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const submit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/login`, {
            email,
            password
        })
        .then((res) =>{
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <React.Fragment>
            <h1>Connexion</h1>
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