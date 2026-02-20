import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div>
            <Link className='text-blue-500 ms-4' to="/"> ← Back To Home</Link>
            <div className='flex flex-col items-center justify-center h-[calc(100vh-4rem)]'>
                <div className='bg-amber-200/75 rounded-md p-16'>
                    <h2 className='text-center text-3xl font-bold mb-12'>Login</h2>
                    <form className='flex flex-col gap-4'>
                        <input className='border-2 border-black/50 rounded-lg p-2' type="email" placeholder="Email"/>
                        <input className='border-2 border-black/50 rounded-lg p-2' type="password" placeholder="Password"/>
                        <button className='bg-orange-500 text-white rounded-lg p-2' type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login