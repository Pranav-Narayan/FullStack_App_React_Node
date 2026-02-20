import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [user, SetUser] = useState({ Name: "", Email: "", Password: "" })
  const [message,setMessage] = useState("")

  const onHandleChange = (e) => {
    SetUser({ ...user, [e.target.name]: e.target.value })
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (user.Name === "" || user.Email === "" || user.Password === "") {
        alert("Please fill all the fields")
      }
      else {
        const res = await axios.post('/api/register',user)
        console.log("Account Creation Completed")
        alert(res.data.message)
        navigate('/login')
      }
    } catch (error) {
      console.log("Error in Account Creation",error.message)
    }
  }

  return (
    <div>
      <Link className='text-blue-400 text-lg px-8 py-2' to="/"> ← Back To Home</Link>
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='bg-amber-200/75 rounded-md p-16'>
          <h2 className='text-center text-3xl font-bold mb-12'>Create Account</h2>

          <form onSubmit={onHandleSubmit} className='flex flex-col gap-4'>

            <input className='border-2 border-black/50 rounded-lg p-2' type="text" placeholder="Name"
              value={user.Name} name="Name" onChange={onHandleChange} />

            <input className='border-2 border-black/50 rounded-lg p-2' type="email" placeholder="Email"
              value={user.Email} name="Email" onChange={onHandleChange} />

            <input className='border-2 border-black/50 rounded-lg p-2' type="password" placeholder="Password"
              value={user.Password} name="Password" onChange={onHandleChange} />

            <button className='bg-orange-500 text-white rounded-lg p-2' type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup