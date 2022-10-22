import axios from 'axios';
import { useState } from 'react'
import { host } from '../../variables';
import { useRouter } from 'next/router'
import singletonRouter from "next/router";

const JoinPadletComponent = () => {

  const [room, setRoom] = useState("");
  const [err, setErr] = useState("");
  

  const handleChange = e => {
    const { value } = e.target;
    setRoom(value)
  }


  const handleRedirect = () => {
    axios.post(host + "/padlet/join", { code: room, email: JSON.parse(localStorage.getItem("user")).email }).then(() => {
      singletonRouter.push("/padlet/" + room)
    }).catch(e => {
      setErr("Your are not allowed to access to this private padlet room.")
    })
  }


  return (
    <div className='w-full h-full items-center justify py-16 flex flex-col bg-[rgba(255,255,255,.5)]'>
        <p className='text-xl max-w-[400px] text-center my-8 login-text'>
          Join to a padlet using the padlet code to share your ideas with the people in the room.
        </p>
        {err && <span className='text-xl p-3 max-w-[350px] text-center text-red-600'>{err}</span>}
        <h2 className='login-text text-3xl font-bold my-4'>Padlet code</h2>
          <input onChange={handleChange} type="text" className='px-4 w-[60%] md:w-[70%] rounded-full py-2 text-xl border-none outline-none login-text mt-4 mb-2' placeholder="Enter the padlet code..."/>
        <button onClick={handleRedirect} className='w-[150px] border border-black flex items-center justify-center h-[40px] rounded-xl my-8 bg-black text-white font-normal text-xl'>Join</button>
    </div>
  )
}

export default JoinPadletComponent