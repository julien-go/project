import React from 'react'
import {useEffect, useState, Fragment} from "react";
import {useLocation, useNavigate} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from "axios";
import {AppContext} from '../reducer/reducer.js'

import UserPosts from './UserPosts'

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
        profileInfos(name);
    }
    
    const profileInfos = (name) => {

            axios.get(`${BASE_URL}/profile/${name}`)
            .then((res)=> {
                if(!res.data.response){
                    setMsg("Erreur de chargement du profil")
                    setUserInfos(initialInfos);
                } else {
                    setMsg('')
                    const regDate = res.data.registrationDate;

                    setUserInfos({email: res.data.email, role: res.data.role, avatarPath: res.data.avatarPath, registrationDate: regDate, postCount: res.data.postCount})
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
            <div className='profile'>
                <h1>Profil</h1>
                    <div className='profile_infos_container'>
                        {msg !== '' && <p>{msg}</p>}
                        {userInfos.email !== '' && <h2 className='username profile_name'>{profileName}</h2>}
                        {userInfos.avatarPath !== '' && <img src={`http://juliengodard.sites.3wa.io:9300/avatars/${userInfos.avatarPath}`} alt={`${profileName}'s avatar`} className="user_avatar profile_avatar"/>}
                        <div className='profile_infos'>
                            <p>Nombre de posts : {userInfos.postCount}</p>
                            <p>Inscrit depuis le : {userInfos.registrationDate}</p>
                        </div>
                    </div>
                    <div className='separator'></div>
                    
                    {profileName === state.username && 
                        <div className='profile_actions_container'>
                            <h2 className='bloc_title'>Gestion du profil</h2>
                            <button className='action_btn' onClick={redirectModifAvatar}>Modifier/Supprimer l'avatar</button>
                            <button className='action_btn' onClick={redirectModifProfile}>Modifier mes informations</button>
                            <button className='action_btn' onClick={redirectDeleteAccount}>Supprimer mon profil</button>
                        </div>
                    }
                    <div className='separator'></div>
                    {userInfos.postCount > 0 && <UserPosts username={profileName.toLowerCase()}/>}
            </div>
        </Fragment>
        )
}

export default Profile;