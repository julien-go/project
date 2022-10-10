import { Fragment, useState, useEffect, useContext}from 'react'
import BASE_URL from "../config.js"
import {AppContext} from '../reducer/reducer'
import axios from 'axios'

const MyCategories = () => {
    const [state, dispatch] = useContext(AppContext)
    const [myCategories, setMyCategories] = useState([]);
    const [otherCategories, setOtherCategories] = useState([]);
    const [toAdd, setToAdd] = useState([]);
    const [toRemove, setToRemove] = useState([]);
    
    const getMyCategories = () => {
        const id = state.id
        axios.get(`${BASE_URL}/get-mycategories`, {
            params: {
                id: id
            }
        })
        .then((res) => {
            // console.log(1)
            if(res.data.categories){
                setMyCategories(res.data.categories);
                setOtherCategories(res.data.otherCategories)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    const changeSelectedCategories = (e)=> {
        let cats = []
        for(let i = 0; i < e.length; i++){
            cats.push(e[i].id)
        }
        setMyCategories(cats)
    }
    
    const addNewCats = (e) => {
        
    }
    
    useEffect(() => {
        getMyCategories()
    }, [])

    
    return (
        <Fragment>
            <h1>Mes centres d'intérêts</h1>
            <ul>
                {myCategories.map((e, i)=> 
                    <li key={i} id={e.id} value={e.name}>{e.name}</li>
                    )}
            </ul>
            <h2>Ajouter abonnement(s)</h2>
            <form onSubmit={addNewCats} encType="multipart/form-data">
                <div>
                    <label name='categories'>
                        <SelectMultipleCategories choosenCategories={otherCategories} changeSelectedCategories={changeSelectedCategories}/>
                    </label>
                </div>
            </form>
            
            
            <h2>Supprimer abonnement(s)</h2>

            
        </Fragment>
    )
}

export default MyCategories;