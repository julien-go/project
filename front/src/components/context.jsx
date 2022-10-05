import React from 'react';
import {initialState, reducer, AppContext} from '../reducer/reducer'

const ContextProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    
    return(
        <AppContext.Provider value={[state, dispatch]}>
            {children}
        </AppContext.Provider>
    )
}
        
export {ContextProvider};