import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='flex flex-col items-center gap-8 justify-center'>
            <h1 className='text-3xl font-bold text-center'>Welcome To Session Based React App</h1>
            <div className='flex gap-4'>
                <Link className='border-2 border-blue-500/75 px-6 py-2 text-blue-500 rounded-md' to="/login">Login</Link>
                <Link className='border-2 border-blue-500/75 px-6 py-2 text-blue-500 rounded-md' to="/register">CreateAccount</Link>
                <Link className='border-2 border-blue-500/75 px-6 py-2 text-blue-500 rounded-md' to="/profile">Profile</Link>
            </div>
        </div>
    )
}

export default Home