import { useState, Fragment, useContext } from 'react';
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
    
    const [state, dispatch] = useContext(AppContext)

    const submitLogin = (e) => {
        const dataUser = {
            email,
            password
        }
        e.preventDefault();
        
        if (!verifyLength(email, 255)){
            setErrorMsg('connection error')
        } else {
            axios.post(`${BASE_URL}/login`, {
                email,
                password
            })
            .then((res) =>{
                console.log(res.data)
                if (!res.data.response){
                    setErrorMsg(res.data.errorMsg);
                } else {
                    setErrorMsg('')
                    localStorage.setItem('jwtToken', res.data.token)
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token
                    res.data.isAdmin && dispatch({type: 'ISADMIN'})
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
        <Fragment>
            <div className='form_container login_container'>
                <h1>Connexion</h1>
                {errorMsg !== '' && <p className='form_error_msg'>{errorMsg}</p>}
                <form onSubmit={submitLogin}>
                        <label name='email'>
                            Email
                            <input type='mail' name='email' maxLength='255' value={email} onChange= {(e) => setEmail(e.target.value)} required/>
                        </label>
                        <label name='password'>
                            Password
                            <input type='password' name='password' maxLength='255' value={password} autoComplete='current-password' onChange= {(e) => setPassword(e.target.value)} required/>
                        </label>
                    <input type='submit' value='Submit'/>
                </form>
            </div>
        </Fragment>
        )
}

export default Login;