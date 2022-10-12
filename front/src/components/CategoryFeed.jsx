import {Fragment, useContext, useState, useEffect} from 'react'
import {AppContext} from '../reducer/reducer'
import {useLocation, useNavigate} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from 'axios'

const CategoryFeed = () => {
    const [state, dispatch] = useContext(AppContext)
    const [thisCategory, setThisCategory] = useState('')
    const [posts, setPosts] = useState([])
    
    const path = useLocation();
    
    const getParams = () => {
        const pathTable = path.pathname.split('/');
        const id = pathTable[pathTable.length-1];
        setThisCategory(id);
    }
    
    const getLastPosts = () => {
        
        axios.get(`${BASE_URL}/get-categoryfeed/${thisCategory.id}`)
        .then((res)=> {
            if(res.data.response){
                
            }
        })
        .catch((err)=> {
            console.log(err)
        })
    }
    
    useEffect(() => {
        getLastPosts();
    }, [])

    return (
        <Fragment>
        {posts.map((e, i)=> {
            <p>{e.id}</p>
        })}
        
        </Fragment>
    )
}
export default CategoryFeed;
