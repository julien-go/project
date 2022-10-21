import { useState, Fragment} from 'react'
import {useNavigate} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from "axios";
import {verifyLength} from '../utils/utils.js'

import AddNewCategorie from './AddNewCategorie'
import Statistics from './Statistics'

const Admin = () => {

    return (
        <Fragment>
            <h1>Tableau d'administration</h1>
            <Statistics/>
            <AddNewCategorie/>
            <div className='separator'></div>
        </Fragment>
        )
}

export default Admin;