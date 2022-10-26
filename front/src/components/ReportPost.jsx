import {Fragment, useContext, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { ImWarning } from "react-icons/im";
import BASE_URL from "../config.js"
import axios from 'axios'

import {AppContext} from '../reducer/reducer'


const ReportPost = (props) => {
    const [state, dispatch] = useContext(AppContext)
    
    const [hidden, setHidden] = useState(false)
    const [active, setActive] = useState(false)
    const [reportMsg, setReportMsg] = useState('')
    
    const submitReport = (e) => {
        console.log(1)
        e.preventDefault()
        if(reportMsg.length < 150 && reportMsg.length > 10){
            console.log(1)
            const params = {userId: state.id, username: state.username, msg:reportMsg, postId: props.postId}
            axios.post(`${BASE_URL}/report-post`, params)
            .then((res)=> {
                console.log(res.data)
                if(res.data.response){
                    setActive(false)
                    setHidden(true)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

     return (
         <Fragment>
         {!hidden &&  
        <div className='report_container'>
            <button className='report_btn' onClick={(e) => setActive(true)}>
                <ImWarning/>
            </button>
            {active &&
                <Fragment>
                    <button onClick={() => setActive(false)}>Fermer</button>
                    <p>Signaler un post inadéquat</p>
                    <form onSubmit={(e) => submitReport(e)}>
                        <textarea name='reportMsg' placeholder='Raison(s) du signalement' minLength='10' maxLength='150' onChange={(e) => setReportMsg(e.target.value)}/>
                        <input type='submit' value='Signaler'/>
                    </form>
                </Fragment>
            }
        </div> 
         }
         </Fragment>
    )
}

export default ReportPost