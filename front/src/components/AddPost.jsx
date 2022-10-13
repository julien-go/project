import {useEffect, Fragment, useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from 'axios'
import SelectMultipleCategories from './SelectMultipleCategories'
import {AppContext} from '../reducer/reducer'


const AddPost = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(AppContext)
    
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [textContent, setTextContent] = useState([]);
    const [msg, setMsg] = useState('');

    const addNewPost = (e) => {
        e.preventDefault()
        const form = new FormData();
        const files = e.target.image.files;
        // console.log(textContent)
        
        if(textContent.length < 20){
            setMsg('Not enough characters')
        } else {
            form.append('userId', state.id);
            form.append('categories', selectedCategories);
            form.append('textContent', textContent);
            form.append('files', files[0]);
            
            axios.post(`${BASE_URL}/add-post`, form)
            .then((res) => {
                if(res.data.response){
                    navigate("/", {replace: true})
                } else {
                setMsg(res.data.msg);
                }
    
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    
    const changeSelectedCategories = (e)=> {
        let cats = []
        for(let i = 0; i < e.length; i++){
            cats.push(e[i].id)
        }
        setSelectedCategories(cats)
    }

    return (
        <Fragment>
            <h1>Ajouter un nouveau post</h1>
            {msg !== '' && <p className='form_error_msg'>{msg}</p> }
            <form onSubmit={addNewPost} encType="multipart/form-data">
                <div>
                    <label name='categories'>
                        Centre(s) d'intérêt(s):
                        <SelectMultipleCategories choosenCategories={selectedCategories} changeSelectedCategories={changeSelectedCategories}/>
                    </label>
                </div>
                <div>
                    <label name='textcontent'>
                        <textarea onChange={(e) => setTextContent(e.target.value)} value={textContent} name='textcontent' minLength='50' maxLength='500'>
                        </textarea>
                    </label>
                </div>
                <div>
                    <label name='image'>
                        <input type='file' name='image'/>
                    </label>
                </div>
                <input type='submit' value='Submit'/>
            </form>
        </Fragment>
        )
}

export default AddPost;