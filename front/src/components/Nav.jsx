import {Fragment, useEffect, useContext}from 'react'
import { NavLink } from 'react-router-dom'
import {AppContext} from '../reducer/reducer.js'
import BASE_URL from "../config.js"
import axios from 'axios'
import { ImHome, ImList, ImPlus, ImStarFull, ImExit, ImUser } from "react-icons/im";

const Nav = () => {
    
    const [state, dispatch]= useContext(AppContext)
    const urlMyProfile = `profile/${state.username}`
    
    useEffect(() => {
        console.log(state)
        const token = localStorage.getItem("jwtToken")
        // console.log(token)
        if(!state.isLogged && token){
          axios.post(`${BASE_URL}/isLogged`,{token})
          .then((res) => {
            //   console.log(res.data)
            if(res.data.token){
              axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token
            }
            res.data.logged && dispatch({type:'LOGIN', payload: {id: res.data.id, username: res.data.username, email: res.data.email}})
            res.data.admin && dispatch({type:'ISADMIN'})
          })
          .catch((err) => {
            console.log(err)
          })
        }
    })

    return (
        <header>
            <div className='empty_bar_header'></div>
           {/* {state.isLogged &&
                <NavCategories />
            } */}
            {state.isLogged &&
            <div className='user_bar'>
                <ul>
                    <li>
                        <NavLink to={urlMyProfile}>
                            <ImUser className='nav_icon'/>
                            <p className='nav_text'>Mon profil</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="my-categories">
                            <ImStarFull className='nav_icon'/>
                            <p className='nav_text'>Mes Centres d'intérêts</p>
                        </NavLink>
                    </li>
                </ul>
                <div className='username_role_container'>
                    <p className='username'>{state.username}</p>
                    {state.isAdmin &&
                        <Fragment>
                                <NavLink className='admin_navlink' to="admin">
                                ADMIN
                                </NavLink>
                        </Fragment>
                    }
                </div>
            </div> }
            <nav className='navbar'>
                <ul>
                    {state.isLogged &&
                        <Fragment>
                            <li>
                                <NavLink to="/">
                                    <ImHome className='nav_icon'/>
                                    <p className='nav_text'>Accueil</p>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="add-post">
                                    <ImPlus className='nav_icon'/>
                                    <p className='nav_text'>Ajouter un post</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="categories">
                                    <ImList className='nav_icon'/>
                                    <p className='nav_text'>Par catégorie</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="disconnect">
                                    <ImExit className='nav_icon disconnect_btn'/>
                                    <p className='nav_text disconnect_btn'>Déconnexion</p>
                                </NavLink>
                            </li>
                        </Fragment>
                    }
                    {!state.isLogged &&
                        <div className='nav_notconnected'>
                            <li>
                                <NavLink to="register">
                                INSCRIPTION
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="login">
                                CONNEXION
                                </NavLink>
                            </li>
                        </div>
                    }
                </ul>
            </nav>
        </header>
        )
}

export default Nav;