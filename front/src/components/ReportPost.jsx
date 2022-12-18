import {Fragment, useContext, useState} from 'react'
import { ImWarning, ImCross } from "react-icons/im";
import BASE_URL from "../config.js"
import axios from 'axios'


import {AppContext} from '../reducer/reducer'

const ReportPost = (props) => {
    const [state, dispatch] = useContext(AppContext)
    const [hidden, setHidden] = useState(false)
    const [active, setActive] = useState(false)
    const [reportMsg, setReportMsg] = useState('')
    
    const submitReport = (e) => {
        e.preventDefault()
        if(reportMsg.length < 150 && reportMsg.length > 10){
            const params = {userId: state.id, username: state.username, msg:reportMsg, postId: props.postId}
            axios.post(`${BASE_URL}/report-post`, params)
            .then((res)=> {
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
                    <div className='modal_container'>
                        <div className='report_form'>
                            <button className='close_modal_btn' onClick={() => setActive(false)}>
                                <ImCross/>
                            </button>
                            <h3 className='bloc_title'>Signaler un post inadéquat</h3>
                            <form onSubmit={(e) => submitReport(e)}>
                                <textarea name='reportMsg' placeholder='Raison(s) du signalement' minLength='10' maxLength='150' onChange={(e) => setReportMsg(e.target.value)}/>
                                <input className='action_btn' type='submit' value='Signaler'/>
                            </form>
                        </div>                 
                    </div>
            }
        </div> 
         }
         </Fragment>
    )
}

export default ReportPost