import React from 'react'
import { useState } from 'react'
import BASE_URL from "../config.js"
import axios from "axios";
const Admin = () => {
    
    const [newCategorie, setNewCategorie] = useState({name: '', descript: ''})
    
    const addCategorie = (e) => {
        e.preventDefault();
        let name = newCategorie.name;
        let description = newCategorie.descript;
        
        axios.post(`${BASE_URL}/add_categorie`, {
            name,
            description
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
            <h1>Tableau d'administration</h1>
            
            <form onSubmit={addCategorie}>
                <label name='name'>
                    <input type='text' name='name' value={newCategorie.name}
                    onChange={(e) => setNewCategorie({...newCategorie, name: e.target.value})} required/>
                </label>
                <label name='name'>
                    <input type='text' name='description' value={newCategorie.descript} onChange={(e) => setNewCategorie({...newCategorie, descript: e.target.value})} required/>
                </label>
                
                
            </form>
        </React.Fragment>
        )
}

export default Admin;