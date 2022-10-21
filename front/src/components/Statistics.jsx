import { useState, Fragment, useEffect} from 'react'
import BASE_URL from "../config.js"
import axios from "axios";

const Statistics = () => {
    
    const [stats, setStats] = useState({});
    
    
    useEffect(()=> {
        axios.get()
    }, [])
    
    return (
        <Fragment>
            <h2 className='bloc_title'>Statistiques</h2>
            <div className='stats_container'>
                
            </div>
        </Fragment>
        )
}

export default Statistics;