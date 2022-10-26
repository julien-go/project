import { useState, Fragment, useEffect} from 'react'
import {useNavigate, NavLink} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from "axios";
import DeletePost from './DeletePost'

const Moderation = () => {
    
    const [reports, setReports] = useState([]);
    const [msg, setMsg] = useState('');
    
    const getReports = () => {
        axios.get(`${BASE_URL}/admin/get-reports`)
        .then((res)=> {
            console.log(res.data.reports)
            if(res.data.response){
                setMsg('')
                setReports(res.data.reports)
            } else {
                setMsg('No reports for the moment')
            }
        })
        .catch((err)=> {
            console.log(err)
        })
    }
    
    const compareId = (a, b) => {
        if(a.id < b.id) return 1
        if(a.id > b.id) return -1
        else return 0
    }
    
    const refresh = () => {
        getReports()
    }
    
    useEffect(()=> {
        getReports()
        console.log(0)
    }, [])
    return (
        <Fragment>
            <div className='feed'>
            <h1>Tableau de modération</h1>
                  {reports.map((e, i)=> {
                        return (
                        <div key={e.id} id={e.post_id} className='post'>
                            <div className="post_header">
                                <NavLink className='post_user' to={`/profile/${e.username}`}>
                                    <p className='username'>{e.post_username}</p>
                                </NavLink>
                            </div>
                           <div className='post_content'>
                                <p>{e.text_content}</p>
                                {e.image !== undefined &&
                                <img src={`http://juliengodard.sites.3wa.io:9300/img/${e.image.url}`} alt={`${e.username}'s uploaded picture`} className="post_img"/>
                                }
                            </div> 
                            <div className='report_description'>
                                <h3>Résumé du signalement</h3>
                                <p>{e.user_id}</p>
                                <p>{e.report_message}</p>
                                <p>{e.report_date}</p>
                            </div>
                            <div>
                                <button>Keep</button>
                            </div>
                            <DeletePost postId={e.id} img={e.image} refresh={refresh}/>
                        </div>
                    )
                    })} 
                    
                </div>

        </Fragment>
        )
}

export default Moderation;