import React from 'react'
import BASE_URL from "../config.js"
import HomeFeed from "./HomeFeed"

const Home = () => {
    
    return (
        <React.Fragment>
            <h1>Home</h1>
            
            <HomeFeed />
        </React.Fragment>
        )
}

export default Home;