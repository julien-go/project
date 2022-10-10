import pool from '../config/database.js';


const getCategories = (req, res) => {
    
    const selectCategories = 'SELECT * FROM categories'
    
    pool.query(selectCategories, (err, cats, fields)=>{
        if (err) throw err
        // console.log(cats)
        
        let categories = [];
        for(let i = 0; i < cats.length; i++){
            categories.push({id: cats[i].id, name: cats[i].name})
        }
        // console.log(categories)
        res.json({response: true, categories})
    })
    
}

export default getCategories;