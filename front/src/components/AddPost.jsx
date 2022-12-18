import {Fragment, useState, useContext} from 'react'
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
        // On envoie une requête à l'api qui ajoute le nouveau post si il est conforme
        e.preventDefault()
        const form = new FormData();
        const files = e.target.image.files;
        
        if(textContent.length < 20){
            setMsg('Pas assez de caractères (min: 20)')
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
    
    const changeSelectedCategories = (selected)=> {
        // On met un array contenant les catégories sélectionnées dans un state
        let cats = []
        for(let i = 0; i < selected.length; i++){
            cats.push(selected[i].id)
        }
        setSelectedCategories(cats)
    }

    return (
        <Fragment>
            <h1>Ajouter un nouveau post</h1>
            {msg !== '' && <p className='form_error_msg'>{msg}</p> }
            <div className='form_container add_post_container'>
                    <form onSubmit={addNewPost} encType="multipart/form-data">
                        <label name='categories'>
                            Centre(s) d'intérêt(s):
                            <SelectMultipleCategories  changeSelectedCategories={changeSelectedCategories}/>
                        </label>
                        <label name='textcontent'>
                            <textarea onChange={(e) => setTextContent(e.target.value)} value={textContent} name='textcontent' rows='5' minLength='50' maxLength='500' placeholder='Écris ici...'>
                            </textarea>
                        </label>
                        <label name='image'>
                            <input type='file' name='image'/>
                        </label>
                    <input type='submit' value='Submit'/>
                </form>
            </div>
        </Fragment>
        )
}

export default AddPost;