import {AppContext} from '../reducer/reducer'
import {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import ReturnButton from './ReturnButton'

const Logo = () => {
    const [state, dispatch] = useContext(AppContext)
    return (
            <div className='logo_container' >
                <NavLink to='/' className='logo_link'>
                    <span className='first_letter'>So</span>cial
                </NavLink>
                {state.isLogged && <ReturnButton/>}
            </div>
            
    )
}

export default Logo;