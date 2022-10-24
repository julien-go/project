import {useState, useContext, Fragment} from 'react';
import {useNavigate} from 'react-router-dom'
import {AppContext} from '../reducer/reducer'
import BASE_URL from "../config.js"
import axios from 'axios'
import { ImWarning } from "react-icons/im";

const DeleteAccount = () => {
    const [state, dispatch] = useContext(AppContext)
    
    const navigate = useNavigate();
    
    const deleteUserAccount = (e) => {
        e.preventDefault()
        if(state.username !== '') {
            axios.post(`${BASE_URL}/delete-account`, {
                id: state.id
            })
            .then((res)=> {
                if(res.data.response){
                    localStorage.removeItem('jwtToken')
                    delete axios.defaults.headers.common['Authorization']
                    dispatch({type: 'LOGOUT'})
                    navigate('/register', {replace: true})
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    
    const redirectBack= (e) => {
        e.preventDefault();
        navigate(`/profile/${state.username}`, {replace: true});
    }
    
    return (
        <Fragment>
        <h1>Suppression du compte utilisateur</h1>
        <div className='delete_account_container'>
            <ImWarning/>
            <p className='important_msg'>Attention, toute suppression de compte est définitive. Les données correspondantes seront supprimées et impossible à récuperer.</p>
            <button className='action_btn' onClick={deleteUserAccount}>Valider la suppression du compte</button>
            <button className='action_btn' onClick={redirectBack}>Retour</button>
        </div>

            
        </Fragment>    
    )
}

export default DeleteAccount;