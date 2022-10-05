//import logo from './logo.svg';
import React from 'react'
import {BrowserRouter, Navigate} from "react-router-dom";
import './App.css';
import BASE_URL from "./config.js"
import {AppContext} from './reducer/reducer.js'
import Router from './components/Router'
import Nav from './components/Nav'


const App = () => {
    
  return (
    <div className="App">
        <BrowserRouter>
            <Nav />
            <Router />
        </BrowserRouter>
    </div>
  );

}

export default App;
