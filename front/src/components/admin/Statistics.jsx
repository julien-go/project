import { useState, Fragment, useEffect} from 'react'
import BASE_URL from "../../config.js"
import axios from "axios";

const Statistics = () => {
    
    const [stats, setStats] = useState({});
    
    useEffect(()=> {
        axios.get(`${BASE_URL}/admin/get-stats`)
        .then((res) => {
            res.data.response && setStats(res.data.stats)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    
    return (
        <Fragment>
            <h2 className='bloc_title'>Statistiques</h2>
            <div className='stats_container'>
                <p>Nombre total d'utilisateurs : {stats.usersCount}</p>
                <p>Nombre total de posts: {stats.postsCount}</p>
                <p>Nombre de posts aujourd'hui: {stats.postsToday}</p>
            </div>
        </Fragment>
        )
}

export default Statistics;