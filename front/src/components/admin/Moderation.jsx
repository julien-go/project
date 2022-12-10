import { useState, Fragment, useEffect} from 'react'
import {useNavigate, NavLink} from 'react-router-dom'
import BASE_URL from "../../config.js"
import axios from "axios";
import DeletePost from '../DeletePost'
import {ImCheckmark, ImCross} from "react-icons/im";

const Moderation = () => {
    
    const [reports, setReports] = useState([]);
    const [msg, setMsg] = useState('');
    
    const getReports = () => {
        axios.get(`${BASE_URL}/admin/get-reports`)
        .then((res)=> {
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
    
    const annulReport = (id) => {
        console.log(id)
        axios.post(`${BASE_URL}/admin/annul-report`, {
            id})
        .then((res)=> {
            res.data.response && refresh()
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    const deletePostReport = (reportId, postId) => {
        console.log(postId)
        if(postId && reportId){
            axios.post(`${BASE_URL}/admin/delete-post-report`, 
                {   reportId,
                    postId
                })
            .then((res)=> {
                res.data.response && refresh()
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    
    const refresh = () => {
        getReports()
    }
    
    useEffect(()=> {
        getReports()
    }, [])
    
    
    return (
        <Fragment>
           <div className='feed'>
            <h1>Tableau de modération</h1>
                {msg && <p>{msg}</p>}
                  {reports.map((element, i)=> {
                        return (
                        <div key={element.id} id={element.post_id} className='post'>
                            <div className="post_header">
                                <NavLink className='post_user' to={`/profile/${element.username}`}>
                                    <p className='username'>{element.post_username}</p>
                                </NavLink>
                            </div>
                           <div className='post_content'>
                                <p>{element.text_content}</p>
                                {element.image !== undefined &&
                                <img src={`http://juliengodard.sites.3wa.io:9300/img/${element.image.url}`} alt={`${element.username}'s uploaded picture`} className="post_img"/>
                                }
                            </div> 
                            <div className='report_description'>
                                <h3>Résumé du signalement</h3>
                                <p>Id de l'utilisateur : {element.user_id}</p>
                                <p>Objet du signalement : {element.report_message}</p>
                                <p>Date : {element.report_date}</p>
                            </div>
                            <div className='moderation_bar'>
                                <button className='validate_btn action_btn' onClick={(e) => annulReport(reports[i].id)}>
                                    <ImCheckmark/>
                                </button>
                                <button className='delete_btn action_btn' onClick={(e) => deletePostReport(reports[i].id, reports[i].post_id)}>
                                    <ImCross/>
                                </button>
                            </div>
                        </div>
                    )
                    })} 
                    
                </div>
        </Fragment>
        )
}

export default Moderation;