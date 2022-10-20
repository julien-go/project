import React from 'react'
import { NavLink } from 'react-router-dom'
import {AppContext} from '../reducer/reducer.js'
import NavCategories from './NavCategories'
import { ImHome, ImList, ImPlus, ImStarFull, ImExit, ImUser } from "react-icons/im";

const Nav = () => {
    
    const [state, dispatch]= React.useContext(AppContext)
    const urlMyProfile = `profile/${state.username}`
    
    // React.useEffect(() => {
    //     console.log(state.id)
    // })

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
                        <React.Fragment>
                            <li>
                                <NavLink className='admin_navlink' to="admin">
                                ADMIN
                                </NavLink>
                            </li>
                        </React.Fragment>
                    }
                </ul>
                <p className='username'>{state.username}</p>
            </div> }
            <nav className='navbar'>
                <ul>
                    {state.isLogged &&
                        <React.Fragment>
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
                        </React.Fragment>
                    }
                    {!state.isLogged &&
                        <React.Fragment>
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
                        </React.Fragment>
                    }
                </ul>
            </nav>
        </header>
        )
}

export default Nav;