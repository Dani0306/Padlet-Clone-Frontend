import React from 'react'
import { CheckCircleOutline } from '@mui/icons-material'

const UserBox = ({ user, add, usersToAdd }) => {
  return (
    <div className="w-[350px] h-max py-2 border border-[#9999] flex items-center justify-between bg-[white] px-4">
        <span onClick={() => add(user)} className='text-base font-bold'>{user}</span>
        <CheckCircleOutline className={`w-7 h-7 rounded-full ${usersToAdd.includes(user) ? "bg-green-500" : ""}`}/>
    </div>
  )
}

export default UserBox