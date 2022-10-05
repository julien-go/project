import React from 'react'
import { NavLink } from 'react-router-dom'
import {AppContext} from '../reducer/reducer.js'

const Nav = () => {
    
    const [state, dispatch]= React.useContext(AppContext)
    const url = `profile/${state.username}`

    return (
        <React.Fragment>
        
        {state.username !== '' && <p>Bienvenue {state.username}</p>}
            <nav>
                <ul>
                    {state.isLogged &&
                        <React.Fragment>
                            <li>
                                <NavLink to="/">
                                HOME
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={url}>
                                MY PROFILE
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="modify-avatar">
                                MODIFY AVATAR
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="disconnect">
                                DISCONNECT
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
                    {state.isAdmin &&
                        <React.Fragment>
                            <li>
                                <NavLink to="admin">
                                ADMINISTRATION
                                </NavLink>
                            </li>
                        </React.Fragment>
                    }
                </ul>
            </nav>
        </React.Fragment>
        )
}

export default Nav;