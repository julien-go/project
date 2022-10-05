import React from 'react'
import {useContext, useEffect, useState, Fragment} from "react";
import {useLocation} from 'react-router-dom'
import BASE_URL from "../config.js"
import axios from "axios";

const Profile = () => {
    
    // const [state, dispatch] = React.useContext(AppContext);
    const [profileName, setProfileName] = useState('')
    const [msg, setMsg] = useState('')
    const initialInfos = {email: '', role: '', avatarPath: '', registrationDate: ''};
    const [userInfos, setUserInfos] = useState(initialInfos);
    const path = useLocation()
    
    const getParams = () => {
        const pathTable = path.pathname.split('/');
        const name = pathTable[pathTable.length-1];
        setProfileName(name);
        console.log(profileName)
    }
    
    const profileInfos = () => {
        
        if(profileName === '') {
            return;
        } else {
            axios.get(`${BASE_URL}/profile/${profileName}`,{
            })
            .then((res)=> {
                if(!res.data.response){
                    setMsg('Error reaching profile')
                } else {
                    setMsg('')
                    const regDate = res.data.registrationDate;
                    setUserInfos({email: res.data.email, role: res.data.role, avatarPath: res.data.avatarPath, registrationDate: regDate)
                }
            })
            .catch((err)=> {
                console.log(err)
            })
            }
    }
    
    useEffect(() => {
        getParams();
        profileInfos();
    }, [profileName])
    
    return (
        <Fragment>
            <h1>Profil</h1>
            {msg !== '' && <p>{msg}</p>}
            <h2>USERNAME : {profileName}</h2>
            {userInfos.avatarPath !== '' && <img src={userInfos.avatarPath} alt={`profile pic`}/>}
            <p>{userInfos.registrationDate}</p>
            
            
            
        </Fragment>
        )
}

export default Profile;