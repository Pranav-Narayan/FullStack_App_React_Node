import React, { useEffect } from 'react'
import axios from 'axios'

const Profile = () => {

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        '/api/profile'
      )
      console.log("Response =", res.data)
    } catch (error) {
      console.log("Error in profile fetching Api : ",
        error.message)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <div>Profile</div>
  )
}

export default Profile