//import logo from './logo.svg';
import React from 'react'
import './App.css';
import { useEffect, useState } from 'react';
import BASE_URL from "./config.js"
import {AppContext} from './components/context'

const App = () => {
  
  const [state, dispatch] = React.useContext(AppContext);


  useEffect(() => {
    console.log('test')
    fetch(`${BASE_URL}/courses`)
      .then(response => response.json())
      .then(res => {
        dispatch({type: 'getInfos', payload: res})
      })

  }, [])


  return (
    <ul>
      {state.courses.map((e,i) => 
        <li key={i}>{e}</li>
      )}
    </ul>
  );

}

export default App;
