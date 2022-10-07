import {useEffect, Fragment, useState} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import Select from 'react-select'

const SelectMultipleCategories = () => {
    
    const [categories, setCategories] = useState([]);
    const [choosenCategories, setChoosenCategories] = useState([]);
    
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
    
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'green' : 'black',
        padding: 20,
      })
    }
    
    return (
        <div className='react_select_container'>
            <Select onChange={(e)=> setChoosenCategories(e.target.value)}className='react-select' styles={customStyles} isMulti options={categories} name='categories' required/>
        </div>
        
    )
}

export default SelectMultipleCategories;