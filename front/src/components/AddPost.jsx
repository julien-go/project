import {useEffect, Fragment, useState} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import SelectMultipleCategories from './SelectMultipleCategories'


const AddPost = () => {
    
    const [categories, setCategories] = useState([])
    const [textcontent, setTextContent] = useState([])
    
    
    const addNewPost = (e) => {
        e.preventDefault()
        console.log(e.target.categories)
        
        const form = new FormData();
        form.append('categories', e.target.categories);
        form.append('textarea', e.target)
     
        
    }

    return (
        <Fragment>
            <h1>Ajouter un nouveau post</h1>
            <form onSubmit={addNewPost} encType="multipart/form-data">
                <label name='categories'>
                Centre(s) d'intérêt(s):
                <SelectMultipleCategories/>
                </label>
                <label name='textcontent'>
                Contenu :
                    <textarea onChange={(e) => setTextContent(e.target.value)} name='textcontent' minLength='100' maxLength='500'>
                    </textarea>
                </label>
                <label name='image'>
                    <input type='file' name='image'/>
                </label>
                <input type='submit' value='Submit'/>
            </form>
        </Fragment>
        )
}

export default AddPost;