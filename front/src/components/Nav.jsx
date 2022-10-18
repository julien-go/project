import React from 'react'
import { NavLink } from 'react-router-dom'
import {AppContext} from '../reducer/reducer.js'
import NavCategories from './NavCategories'

const Nav = () => {
    
    const [state, dispatch]= React.useContext(AppContext)
    const urlMyProfile = `profile/${state.username}`
    
    // React.useEffect(() => {
    //     console.log(state.id)
    // })

    return (
        <header>
            <nav className='navbar'>
                <ul>
                    {state.isLogged &&
                        <React.Fragment>
                            <li>
                                <NavLink to="/">
                                    HOME
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="add-post">
                                AJOUTER UN POST
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="categories">
                                CATEGORIES
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
           {/* {state.isLogged &&
                <NavCategories />
            } */}
            {state.isLogged &&
            <div className='user_bar'>
                <ul>
                    <li>
                        <p className='username'>{state.username}</p>
                    </li>
                    <li>
                        <NavLink to={urlMyProfile}>
                        Profil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="my-categories">
                        Centres d'intérêts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="disconnect">
                            Déconnexion
                        </NavLink>
                    </li>
                </ul>
            </div> }

        </header>
        )
}

export default Nav;