import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
    

    return (
        <React.Fragment>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">
                        HOME
                        </NavLink>
                    </li>
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
                
                </ul>
        </nav>
        </React.Fragment>
        )
}

export default Nav;