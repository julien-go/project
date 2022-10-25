import {useContext} from 'react'
import {AppContext} from '../reducer/reducer'
import {Routes, Route} from "react-router-dom";
import Middleware from "./Middleware"
import ReturnButton from './ReturnButton'

import {routes} from "../config/path"

            
const Router = () => {
    const [state, dispatch] = useContext(AppContext)
    return (
        <main>
        <Routes>
            {routes.map((e, i) => {
                return (
                    <Route key={i} 
                    path={e.path} 
                    element={<Middleware>{e.element}</Middleware>}
                    />
                )
            })}
        </Routes>
        </main>
    )
}

export default Router;