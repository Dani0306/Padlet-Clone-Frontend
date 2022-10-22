import { Facebook } from '@mui/icons-material'
import { signIn } from '../../firebase/auth'
import axios from 'axios'
import { useState } from 'react'
import singletonRouter from 'next/router'

const Register = () => {

  const [err, setErr] =  useState("");

  const registerHandler = async () => {
    const { user: { email, photoURL, displayName } } = await signIn();

    const response = await axios.post("/api/auth/register", { 
      email, username: displayName, profile: photoURL
    })

    const user = { email, username: displayName, profile: photoURL }

    if(response.status === 200) {
      localStorage.setItem("user", JSON.stringify(user));
      singletonRouter.push("/padlet")
    }
    else setErr(response.data.error)
  

  }

  return (
    <div className='w-full h-full flex flex-col items-center'>
    <div className='w-[350px] md:w-[500px] h-[600px] rounded-xl flex items-center flex-col bg-[rgba(255,255,255,.5)] '>
      <h2 className='login-text text-4xl mt-16 font-bold'>Padlet</h2>
      <h3 className='login-text text-2xl mt-8 lg:mt-12 mb-4 font-bold'>Register</h3>
      <span className='text-sm text-[#333] max-w-[65%] text-center'>Get started with our platform to see all the amazing things you can build here.</span>
      <button onClick={registerHandler} className='w-[80%] md:w-[60%] h-[40px] flex items-center justify-center mt-6 md:mt-12 text-white border border-[#48e]'>
          <div className='w-[20%] h-full flex items-center justify-center bg-white'>
            <img className='w-[30px] h-[30px] object-cover' src="/gogle-icon.png" alt="Google icon" />
          </div>
        <span className='w-[80%] flex justify-center items-center h-full bg-[#48e]'>Register with google</span>
      </button>
      <button className='w-[80%] md:w-[60%] h-[40px] my-3 flex items-center justify-center bg-[#3b5998] text-white'>
            <Facebook className='!w-8 !h-8 text-white ml-[-5px] mr-2'/>
            Register with Facebook
      </button>
      <button className='w-[80%] md:w-[60%] h-[40px] flex text-black border border-black bg-white'>
        <div className='w-[20%] h-full flex items-center justify-center'>
            <img className='w-[25px] h-[25px] object-cover' src="/microsoft.png" alt="Google icon" />
        </div>
        <span className='w-[80%] flex justify-center items-center h-full'>Register with Microsoft</span> 
      </button> 
    </div>
</div>
  )
}

export default Register