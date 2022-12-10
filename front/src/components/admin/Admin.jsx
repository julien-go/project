import {Fragment} from 'react'
import {NavLink} from 'react-router-dom'
import BASE_URL from "../../config.js"
import axios from "axios";
import {verifyLength} from '../../utils/utils.js'

import AddNewCategorie from './AddNewCategorie'
import Statistics from './Statistics'

const Admin = () => {

    return (
        <Fragment>
            <h1>Tableau d'administration</h1>
            <div className='admin_bloc_container'>
                <h2 className='bloc_title'>Modération</h2>
                    <NavLink to='/moderation'>
                        <button className='action_btn'>Gérer les signalements</button>
                    </NavLink>
            </div>
            <div className='separator'></div>
            <Statistics/>
            <div className='separator'></div>
            <AddNewCategorie/>
        </Fragment>
        )
}

export default Admin;