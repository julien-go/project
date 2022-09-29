import React from 'react';

const initialState = {courses: []};

const reducer = (state, action) => {
    
    switch(action.type) {
        
        case 'getInfos': 
            return {...state, courses: [...action.payload]}
        default:
            return state;
    }
}

export {reducer, initialState}