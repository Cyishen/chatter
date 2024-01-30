"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation"

const page = () => {
  const { userId } = useParams()
  const [user, setUser] = useState()

  const getUserInfo = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();

      setUser(data.filter( (user) => user._id === userId))
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div className='profile-page'>
      {user?.map((nowUser, index) => (
        <div key={index}>
          <h1 className="text-heading3-bold mb-10">{nowUser.username} profile</h1>
          <img
            src={nowUser.profileImage || "/assets/person.jpg"}
            alt="profile"
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}

export default page