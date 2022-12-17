import React from 'react'
import {BrowserRouter, Navigate} from "react-router-dom";

import BASE_URL from "./config.js"
import {AppContext} from './reducer/reducer.js'
import Router from './components/Router'
import Nav from './components/Nav'
import Logo from './components/Logo'
import Footer from './components/Footer'





const App = () => {
    
  return (
    <div className="App">
        <BrowserRouter>
            <Logo/>
            <Nav />
            <Router />
            <Footer />
        </BrowserRouter>
    </div>
  );

}

export default App;
