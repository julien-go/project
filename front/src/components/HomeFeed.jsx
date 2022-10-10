import {Fragment, useContext, useState, useEffect} from 'react'
import {AppContext} from '../reducer/reducer'

const HomeFeed = () => {
    const [state, dispatch] = useContext(AppContext)
    
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        // getLast();
    }, [])
    
    
    return (
        <Fragment>
        
        </Fragment>
    )
}
export default HomeFeed;