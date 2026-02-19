import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Welcome To Session Based React App</h1>
            <div>
                <Link to="/login">Login</Link>
                <Link to="/register">CreateAccount</Link>
                <Link to="/profile">Profile</Link>
            </div>
        </div>
    )
}

export default Home