import React from 'react';

const initialState = {username: '', 
                    isLogged: false, 
                    isAdmin: false
                    };
                    
const AppContext = React.createContext([]);

const reducer = (state, action) => {
    switch(action.type) {
        
        case 'LOGIN': 
            return {...state, username: action.payload , isLogged: true};
        case 'LOGOUT': 
            return {...state, username: '', isLogged: false, isAdmin: false};
        case 'ISADMIN':
            return {...state, username: '', isAdmin: true};
        default:
            return state;
    }
}

export {reducer, initialState, AppContext}