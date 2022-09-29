import React from 'react';
import {initialState, reducer} from './reducer'

const AppContext = React.createContext([]);

const ContextProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    
    return(
        <AppContext.Provider value={[state, dispatch]}>
            {children}
        </AppContext.Provider>
    )
}
        
export {ContextProvider, AppContext};