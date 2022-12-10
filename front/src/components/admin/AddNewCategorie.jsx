import React from 'react'
import { useState, Fragment } from 'react'
import {useNavigate} from 'react-router-dom'
import BASE_URL from "../../config.js"
import axios from "axios";
import {verifyLength} from '../../utils/utils.js'

const AddNewCategorie = () => {
    
        const initialNewCat = {name: '', descript: ''};
    const [newCategorie, setNewCategorie] = useState(initialNewCat)
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate();
    
    const addCategorie = (e) => {
        e.preventDefault();
        
        if(!verifyLength(newCategorie.name, 20) || !verifyLength(newCategorie.name, 255)){
            setErrorMsg('Too many characters in an input')
        } else {
            let name = newCategorie.name;
            let descript = newCategorie.descript;
            setErrorMsg('')
            
            axios.post(`${BASE_URL}/admin/add-categorie`, {
                name,
                descript
            })
            .then((res) =>{
                res.data.response && setNewCategorie(initialNewCat)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    
    return (
            <Fragment>
                <h2 className='bloc_title'>Ajouter une nouvelle catégorie</h2>
                <div className='form_container add_categorie_container'>
                    {errorMsg !== '' && <p className='form_error_msg'>{errorMsg}</p>}
                    <form onSubmit={addCategorie}>
                        <label name='name'>
                            Nom de la catégorie : 
                            <input type='text' name='name' maxLength='20' value={newCategorie.name}
                            onChange={(e) => setNewCategorie({...newCategorie, name: e.target.value})} required/>
                        </label>
                        <label name='description'>
                            Description : 
                            <input type='text' name='description' maxLength='255' value={newCategorie.descript} onChange={(e) => setNewCategorie({...newCategorie, descript: e.target.value})} required/>
                        </label>
                        <input className='action_btn' type='submit' value='Ajouter'/>
                    </form> 
                </div>
            </Fragment>    
    )
}

export default AddNewCategorie;