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
                            <ImUser/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="my-categories">
                            <ImStarFull/>
                        </NavLink>
                    </li>
                    {state.isAdmin &&
                        <Fragment>
                            <li>
                                <NavLink className='admin_navlink' to="admin">
                                ADMIN
                                </NavLink>
                            </li>
                        </Fragment>
                    }
                </ul>
                <p className='username'>{state.username}</p>
            </div> }
            <nav className='navbar'>
                <ul>
                    {state.isLogged &&
                        <Fragment>
                            <li>
                                <NavLink to="/">
                                    <ImHome/>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="add-post">
                                    <ImPlus/>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="categories">
                                    <ImList/>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="disconnect">
                                    <ImExit className='disconnect_btn'/>
                                </NavLink>
                            </li>
                        </Fragment>
                    }
                    {!state.isLogged &&
                        <Fragment>
                            <li>
                                <NavLink to="register">
                                REGISTER
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="login">
                                LOGIN
                                </NavLink>
                            </li>
                        </Fragment>
                    }
                </ul>
            </nav>
        </header>
        )
}

export default Nav;