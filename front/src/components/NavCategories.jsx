import {useEffect, useState, Fragment} from "react";
import BASE_URL from "../config.js"
import { NavLink } from 'react-router-dom'
import axios from "axios";

const NavCategories = () => {
    
    const [categories, setCategories] = useState([])
    
    const getCategories = () => {
        axios.get(`${BASE_URL}/get-categories`)
        .then((res)=>{
            if(res.data.response){
                const data = [];
                for(let i = 0; i < res.data.categories.length; i++){
                    data.push({value: res.data.categories[i].name, id: res.data.categories[i].id})
                }
                setCategories(data)
            } 
        })
        .catch((err)=> {
            console.log(err)
        })
    }
    
    useEffect(()=> {
        getCategories()
    }, [])
    
    return (
        <div>
            <h1>Par catégories :</h1>
            <nav className='nav_categories'>
                <ul>
                    {categories.map((e, i)=> 
                    <li key={i}>
                        <NavLink to={`/category/${e.value}`}>
                        {e.value}
                        </NavLink>
                    </li>
                    )}
                </ul>
            </nav>
        </div>
        )
}

export default NavCategories