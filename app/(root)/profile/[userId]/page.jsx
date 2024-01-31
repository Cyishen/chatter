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
    <div className='profile-page2'>
      {user?.map((nowUser, index) => (
        <div key={index} className='flex flex-col items-center p-5'>
          <h1 className="text-heading3-bold mb-10">Profile</h1>

          <h1 className="text-heading3-bold mb-5">{nowUser.username}</h1>
          <img
            src={nowUser.profileImage || "/assets/person.jpg"}
            alt="profile"
            className="w-40 h-40 rounded-full object-cover mb-10"
          />

          <div className='flex gap-10 justify-center'>
            <div className='flex flex-col items-center'>
              <img src='/assets/home-fill.svg' alt='home' width={40} height={40}/>
              <p>Home</p>
            </div>

            <div className='flex flex-col items-center'>
              <img src='/assets/phone.svg' alt='home' width={40} height={40}/>
              <p>Contact</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default page