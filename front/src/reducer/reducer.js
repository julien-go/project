import React from 'react';

const initialState = {id: null, 
                    username: '',
                    email: '',
                    isLogged: false, 
                    isAdmin: false,
                    categories: []
                    };
                    
const AppContext = React.createContext([]);

const reducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN': 
            return {...state, id: action.payload.id, username: action.payload.username, email: action.payload.email , isLogged: true};
        case 'LOGOUT': 
            return {...state, id: null, username: '', email: '', isLogged: false, isAdmin: false};
        case 'ISADMIN':
            return {...state, isAdmin: true};
        default:
            return state;
    }
}

export {reducer, initialState, AppContext}