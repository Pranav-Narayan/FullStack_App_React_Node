import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({ Email: "", Password: "" })

    const onHandleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (user.Email === "" || user.Password === "") {
                alert('Please fill the fields')
            }
            else {
                const res = await axios.post('/api/login', user)
                console.log("Login Completed")
                alert("Login Completed")
                navigate('/profile')
            }
        } catch (error) {
            console.log("Error in Login", error.message)
        }
    }
    return (
        <div>
            <Link className='text-blue-500 ms-4' to="/"> ← Back To Home</Link>
            <div className='flex flex-col items-center justify-center h-[calc(100vh-4rem)]'>
                <div className='bg-amber-200/75 rounded-md p-16'>
                    <h2 className='text-center text-3xl font-bold mb-12'>Login</h2>
                    <form onSubmit={onHandleSubmit} className='flex flex-col gap-4'>
                        <input className='border-2 border-black/50 rounded-lg p-2' type="email" placeholder="Email"
                            value={user.Email} name='Email' onChange={onHandleChange} />
                        <input className='border-2 border-black/50 rounded-lg p-2' type="password" placeholder="Password"
                            value={user.Password} name='Password' onChange={onHandleChange} />
                        <button className='bg-orange-500 text-white rounded-lg p-2' type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login