import { Facebook } from '@mui/icons-material'
import { signIn } from '../../firebase/auth'
import axios from 'axios'
import { useState } from 'react'
import singletonRouter from "next/router";

const Login = () => {

  const [err, setErr] = useState("")

  const loginHandler = async () => {
    const { user: { email, displayName, photoURL } } = await signIn();
    const user = { email, username: displayName, profile: photoURL };

    const response = await axios.post("/api/auth/login", { email });
    if(response.status === 200) {
      localStorage.setItem("user", JSON.stringify(user))
      singletonRouter.push("/padlet");
    }
    else setErr(response.data.message)

  }

  return (
    <div className='w-full h-full flex flex-col items-center'>
        <div className='w-[350px] md:w-[500px] h-[600px] rounded-xl flex items-center flex-col bg-[rgba(255,255,255,.5)]'>
          <h2 className='login-text text-4xl mt-[20%] font-bold'>Padlet</h2>
          <h3 className='login-text text-2xl mt-10 mb-3 font-bold'>Sign in</h3>
          <span className='text-sm text-[#333]'>Please login to use the platform.</span>
          <button onClick={loginHandler} className='w-[70%] md:w-[60%] h-[40px] flex items-center justify-center mt-8 text-white border border-[#48e]'>
              <div className='w-[20%] h-full flex items-center justify-center bg-white'>
                <img className='w-[30px] h-[30px] object-cover' src="/gogle-icon.png" alt="Google icon" />
              </div>
            <span className='w-[80%] flex justify-center items-center h-full bg-[#48e]'>Sign in with google</span>
          </button>
          <button className='w-[70%] md:w-[60%] h-[40px] my-3 flex items-center justify-center bg-[#3b5998] text-white'>
                <Facebook className='!w-8 !h-8 text-white ml-[-5px] mr-2'/>
              Sign in with Facebook
          </button>
          <button className='w-[70%] md:w-[60%] h-[40px] flex text-black border border-black bg-white'>
            <div className='w-[20%] h-full flex items-center justify-center'>
                <img className='w-[25px] h-[25px] object-cover' src="/microsoft.png" alt="Google icon" />
            </div>
            <span className='w-[80%] flex justify-center items-center h-full'>Sign in with Microsoft</span> 
          </button> 
        </div>
    </div>
  )
}

export default Login


{/* <h2 className='signin-title font-semibold text-2xl mt-16 mb-6'>Sign In</h2>
        <span className='login-text max-w-[400px] text-xl text-center'>Welcome back to padlet, the place where you can create awesome things.</span>
          <button onClick={loginHandler} className='w-[250px] h-[40px] my-2 flex mt-6 text-white border border-[#48e]'>
           
            
          </button>
          
          */}