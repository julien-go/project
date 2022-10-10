import {useEffect, Fragment, useState} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import Select from 'react-select'
import {customSelectStyles} from '../utils/customReactSelectStyle.js'

const SelectMultipleCategories = ({selectedCategories, changeSelectedCategories}) => {
    
    const [categories, setCategories] = useState([]);
    
    const getCategories = () => {
        axios.get(`${BASE_URL}/get-categories`)
        .then((res)=>{
            if(res.data.response){
                const data = [];
                for(let i = 0; i < res.data.categories.length; i++){
                    data.push({value: res.data.categories[i].name, label: res.data.categories[i].name, id: res.data.categories[i].id})
                }
                // console.log(data)
                updateCategories(data);
            } 
        })
        .catch((err)=> {
            console.log(err)
        })
    }
    
    const updateCategories = (data) => {
        setCategories(data)
    }
    
    useEffect(()=> {
        getCategories()
    }, [])
    

    return (
        <div className='react_select_container'>
            <Select onChange={(e)=> changeSelectedCategories(e)} value={selectedCategories} className='react-select' styles={customSelectStyles} isMulti options={categories} name='categories' required/>
        </div>
        
    )
}

export default SelectMultipleCategories;