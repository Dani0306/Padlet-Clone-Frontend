import React from 'react'
import { useAppContext } from '../../context/AppContext'
import { Close, Edit, Person, Help, Logout } from '@mui/icons-material'
import { signOutUser } from '../../firebase/auth'
import axios from 'axios'
import Link from 'next/link'

const ProfileModal = () => {

    const { setShowProfileModal } = useAppContext();

    const logout = async () => {
        await signOutUser();
        const logout = await axios.post("/api/auth/logout");
        if(logout.data.message === "Logout successfull.") window.location.reload();
    }

  return (
    <div className='z-40 absolute w-full h-full lg:w-[300px] lg:h-[40vh] py-16 flex flex-col items-center top-0 right-0 lg:top-[8vh] lg:right-[150px] bg-[#111]'>
        <button onClick={() => setShowProfileModal(false)} className='absolute top-4 right-4'>
            <Close className='!w-7 !h-7 text-white'/>
        </button>
        <div className='profile-list-item border-t cursor-pointer'>
            <span>Edit Profile</span>
            <Edit className='!w-6 !h-6 text-white'/>
        </div>
        <Link href='/padlet'>
            <div className='profile-list-item cursor-pointer'>
                <span>My padlets</span>
                <Person className='!w-6 !h-6 text-white'/>
            </div>
        </Link>
        <div className='profile-list-item cursor-pointer'>
            <span>Help</span>
            <Help className='!w-6 !h-6 text-white'/>
        </div>
        <div onClick={logout} className='profile-list-item cursor-pointer'>
            <span>Logout</span>
            <Logout className='!w-6 !h-6 text-white'/>
        </div>
    </div>
  )
}

export default ProfileModal