import {useNavigate} from 'react-router-dom'
import { ImUndo2 } from "react-icons/im";

const ReturnButton = () => {
    const navigate = useNavigate();
    const returnBack = ()=> {
        navigate(-1)
    }
    
    return (
            <button className='action_btn return_btn' onClick={returnBack}>
                <ImUndo2/>
            </button>
    )
}

export default ReturnButton;