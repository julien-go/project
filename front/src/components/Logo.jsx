import {AppContext} from '../reducer/reducer'
import {useContext} from 'react'
import ReturnButton from './ReturnButton'

const Logo = () => {
    const [state, dispatch] = useContext(AppContext)
    return (
            <div className='logo_container' ><span className='first_letter'>O</span>pium
                {state.isLogged && <ReturnButton/>}
            </div>
            
    )
}

export default Logo;