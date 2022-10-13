import React from 'react'
import {useContext, useEffect, useState, Fragment} from "react";
import {useLocation, useNavigate} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from "axios";
import {AppContext} from '../reducer/reducer.js'

const Profile = () => {
    const [state, dispatch] = React.useContext(AppContext)
    
    const [profileName, setProfileName] = useState('')
    const [msg, setMsg] = useState('')
    const initialInfos = {email: '', role: '', avatarPath: '', registrationDate: ''};
    const [userInfos, setUserInfos] = useState(initialInfos);
    
    const path = useLocation()
    const navigate = useNavigate();
    
    const getParams = () => {
        const pathTable = path.pathname.split('/');
        const name = pathTable[pathTable.length-1];
        setProfileName(name);
        // console.log(profileName)
        profileInfos(name);
    }
    
    const profileInfos = (name) => {

            axios.get(`${BASE_URL}/profile/${name}`)
            .then((res)=> {
                if(!res.data.response){
                    setMsg("This profile doesn't exists")
                    setUserInfos(initialInfos);
                } else {
                    setMsg('')
                    const regDate = res.data.registrationDate;

                    setUserInfos({email: res.data.email, role: res.data.role, avatarPath: res.data.avatarPath, registrationDate: regDate})
                }
            })
            .catch((err)=> {
                console.log(err)
            })
            // }
    }
    
    const redirectModifAvatar = (e) => {
        e.preventDefault();
        navigate('/modify-avatar')
    }
    const redirectModifProfile = (e) => {
        e.preventDefault();
        navigate('/modify-profile')
    }
    const redirectDeleteAccount = (e) => {
        e.preventDefault();
        navigate('/delete-account')
    }
    
    useEffect(() => {
        getParams();
    }, [path.pathname])
    
    return (
        <Fragment>
            <div>
                <h1>Profil</h1>
                {msg !== '' && <p>{msg}</p>}
                {userInfos.email !== '' && <h2>USERNAME : {profileName}</h2>}
                {userInfos.avatarPath !== '' && <img src={`http://juliengodard.sites.3wa.io:9300/avatars/${userInfos.avatarPath}`} alt={`${profileName}'s avatar`} className="user_avatar"/>}
                <p>{userInfos.registrationDate}</p>
            </div>
            <hr/>
            {profileName === state.username && 
                <div>
                    <h3>Gestion du profil</h3>
                    <button onClick={redirectModifAvatar}>Modify/Add avatar</button>
                    <button onClick={redirectModifProfile}>Modify profile informations</button>
                    <button onClick={redirectDeleteAccount}>Delete my profile</button>
                </div>
            }
        </Fragment>
        )
}

export default Profile;