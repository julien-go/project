import {useState, useContext, Fragment} from 'react';
import {useNavigate} from 'react-router-dom'
import {AppContext} from '../reducer/reducer'
import BASE_URL from "../config.js"
import axios from 'axios'

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
            <p>Attention, toute suppression de compte est définitive. Les données correspondantes seront supprimées et impossible à récuperer.</p>
            <button onClick={deleteUserAccount}>Valider la suppression du compte</button>
            <button onClick={redirectBack}>Retour</button>
            
        </Fragment>    
    )
}

export default DeleteAccount;