import { Fragment, useState, useEffect, useContext}from 'react'
import {useNavigate} from 'react-router-dom'
import BASE_URL from "../config.js"
import {AppContext} from '../reducer/reducer'
import axios from 'axios'
import Select from 'react-select'
import {customSelectStyles} from '../utils/customReactSelectStyle.js'

const MyCategories = () => {
    const [state, dispatch] = useContext(AppContext)
    
    const [myCategories, setMyCategories] = useState([]);
    const [otherCategories, setOtherCategories] = useState([]);
    const [toAdd, setToAdd] = useState([]);
    const [toRemove, setToRemove] = useState([]);
    
    const navigate = useNavigate();
    
    const getMyCategories = () => {
        const id = state.id
        axios.get(`${BASE_URL}/get-mycategories/${id}`)
        .then((res) => {
            if(res.data.categories){
                const myData = [];
                const otherData = [];
                for(let i = 0; i < res.data.categories.length; i++){
                    myData.push({value: res.data.categories[i].name, label: res.data.categories[i].name, id: res.data.categories[i].id})
                }
                for(let j = 0; j < res.data.otherCategories.length; j++){
                    otherData.push({value: res.data.otherCategories[j].name, label: res.data.otherCategories[j].name, id: res.data.otherCategories[j].id})
                }
                setMyCategories(myData);
                setOtherCategories(otherData)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const changeToAdd = (e) => {
        let cats = []
        for(let i = 0; i < e.length; i++){
            cats.push(e[i])
        }
        setToAdd(cats)
    }
    
    const changeToRemove = (e) => {
        let cats = []
        for(let i = 0; i < e.length; i++){
            cats.push(e[i])
        }
        setToRemove(cats)
    }
    
    const submitAdd = (e) => {
        e.preventDefault();
        if(toAdd !== [] || toAdd !== undefined){
            axios.post(`${BASE_URL}/follow-categories`, {
                toAdd,
                userId: state.id
            })
            .then((res)=> {
                if(res.data.response){
                    setToAdd([])
                    navigate('/')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    
    const submitRemove = (e) => {
        e.preventDefault();
        if(toRemove !== []){
            axios.post(`${BASE_URL}/unfollow-categories`, {
                toRemove,
                userId: state.id
            })
            .then((res)=> {
                if(res.data.response){
                    setToRemove([])
                    navigate('/')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    
    useEffect(() => {
        getMyCategories()
    },[])

    return (
        <Fragment>
            <div className='mycategories'>
                <h1>Mes centres d'intérêts</h1>
                <ul className='mycategories_list'>
                    {myCategories.map((e, i)=> 
                        <li className='label_category' key={i} id={e.id} value={e.value}>{e.value}</li>
                        )}
                </ul>
                <div className='separator'></div>
                <div className='bloc_mycategories'>
                    <h2 className='bloc_title'>Ajouter abonnement(s)</h2>
                    <form onSubmit={submitAdd}>
                        <div className='react_select_container'>
                            <label>
                                <Select onChange={(e)=> changeToAdd(e)} value={toAdd} className='react-select' styles={customSelectStyles} isMulti isSearchable={false} options={otherCategories} name='toAdd' required/>
                            </label>
                            <input className='action_btn' type="submit" value="Ajouter un abonnement"/>
                        </div>
                    </form>
                </div>
                <div className='separator'></div>
                <div className='bloc_mycategories'>
                    <h2 className='bloc_title'>Supprimer abonnement(s)</h2>
                    <form onSubmit={submitRemove}>
                    <div className='react_select_container'>
                        <label>
                            <Select menuPlacement='top' onChange={(e)=> changeToRemove(e)} value={toRemove} className='react-select' styles={customSelectStyles} isMulti isSearchable={false} options={myCategories} name='toRemove' required/>
                        </label>
                        <input className='action_btn' type="submit" value="Supprimer un abonnement"/>
                    </div>
                </form>
                </div>
            </div>
        </Fragment>
    )
}

export default MyCategories;