//import logo from './logo.svg';
import React from 'react'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import BASE_URL from "./config.js"
import {AppContext} from './components/context'
import axios from 'axios'

import Home from './components/Home'
import Nav from './components/Nav'
import Register from './components/Register'
import Login from './components/Login'


const App = () => {

    // const [data, setData] = useState([]);
  
    // useEffect(() => {
    //     const data = {
    //     name:'bob',
    //     age:99
    //     }
    //     axios.post(`${BASE_URL}/todo`,data)
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // },[])
  
    // useEffect(() => {
    //     axios.get(`${BASE_URL}/courses/${nb}`)
    //         .then(function (response) {
    //         // en cas de réussite de la requête
    //             console.log(response);
    //             setData(response.data)
    //         })
    //         .catch(function (error) {
    //         // en cas d’échec de la requête
    //             console.log(error);
    //         })
    //         .then(function () {
    //         // dans tous les cas
    //         });
            
    //     }, [])


  return (
    <div className="App">
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="register" element={<Register />}/>
                <Route path="login" element={<Login />}/>
            </Routes>
      </BrowserRouter>
      
    </div>
  );

}

export default App;
