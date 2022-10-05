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
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const [state, dispatch] = React.useContext(AppContext)
    
    const submitRegister = (e) => {
        e.preventDefault();
        if (!verifyLength(email, 255) || !verifyLength(username, 20)){
            setErrorMsg('Too many characters on an input')
        } else {
            if(username.includes(' ')){
                setErrorMsg('Empty spaces not allowed in username')
            } else {
                if(!checkRegExPassword(password)){
                    setErrorMsg('Password must be at least 8 characters and must contain at least 1 uppercase character, 1 lowercase character, 1 number and 1 special character');
                } else {
                    if(!checkRegExEmail(email)){
                        setErrorMsg("Email's format is not valid")
                    } else {
                        axios.post(`${BASE_URL}/register`, {
                            username,
                            email,
                            password
                        })
                        .then((res) =>{
                            // console.log(res)
                            if (res.data.errorMsg !== ''){
                                setErrorMsg(res.data.errorMsg);
                            } else {
                                setErrorMsg('')
                                dispatch({type: 'LOGIN', payload: res.data.username})
                                navigate("/", {replace: true});
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
    
    return (
        <React.Fragment>
            <h1>Inscription</h1>
            {errorMsg !== '' && <p className='form_error_msg'>{errorMsg}</p>}
            <form onSubmit={submitRegister}>
                <div>
                    <label name='username'>
                        Username
                        <input type='text' name='username' maxLength='20' autoComplete='username' value={username} onChange= {(e) => setUsername(e.target.value)} required/>
                    </label>
                </div>
                <div>
                    <label name='email'>
                        Email
                        <input type='email' name='email' maxLength='255' value={email} onChange= {(e) => setEmail(e.target.value)} required/>
                    </label>
                </div>
                <div>
                    <label name='password'>
                        Password
                        <input type='password' name='password' maxLength='255' value={password}  autoComplete='new-password' onChange= {(e) => setPassword(e.target.value)} required/>
                    </label>
                </div>
                <input type='submit' value='Submit'/>
            </form>
        </React.Fragment>
        )
}

export default Register;