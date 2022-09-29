import React from 'react'
import { useEffect, useState } from 'react';
import BASE_URL from "../config.js"
import axios from 'axios'

const Register = () => {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    
    const submit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/register`, {
            username,
            email,
            password
        })
        .then((res) =>{
            console.log(res)
            if (res.data.errorMsg !== ''){
                setErrorMsg(res.data.errorMsg);
            } else {
                setErrorMsg('')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <React.Fragment>
            <h1>Inscription</h1>
            {errorMsg !== '' && <p>{errorMsg}</p>}
            <form onSubmit={submit}>
                <div>
                    <label name='username'>
                        Username
                        <input type='text' name='username' value={username} onChange= {(e) => setUsername(e.target.value)} required/>
                    </label>
                </div>
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

export default Register;