import {Routes, Route} from "react-router-dom";
import Middleware from "./Middleware"

import {routes} from "../config/path"

            
const Router = () => {
    
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