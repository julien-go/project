import React from 'react'
import { NavLink } from 'react-router-dom'
import {AppContext} from './reducer/reducer'

const Nav = () => {
    
    const [state, dispatch]= React.useContext(AppContext)
    console.log(state)

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