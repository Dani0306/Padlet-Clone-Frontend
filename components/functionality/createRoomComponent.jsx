import { ArrowRightAlt } from '@mui/icons-material';
import { useState } from 'react';
import { codeGenerator } from '../../utils/codeGenerator'
import axios from 'axios'
import { host } from '../../variables'
import singletonRouter from "next/router";

const CreateRoomComponent = () => {

  const [padletToCreate, setPadletToCreate] = useState({
    code: "",
    name: ""
  })

  const handleSubmit = async e => {
    e.preventDefault();
    let code = codeGenerator();
    await axios.post(host + '/padlet/createRoom', { code, name: padletToCreate.name, owner: JSON.parse(localStorage.getItem("user")), privacy: e.target.privacy.value });
    setPadletToCreate({ ...padletToCreate, code })
  }
  
  const handleChange = e => {
     const { name, value } = e.target;
     setPadletToCreate({...padletToCreate, [name]: value})
  }

  const handleRedirect = () => {
    singletonRouter.push("/padlet/" + padletToCreate.code);
  }

  return (
    <div className='w-full h-full flex items-center flex-col bg-[rgba(255,255,255,.5)]'>
        <p className='text-xl max-w-[400px] text-center my-16 mb-8 login-text'>
          Create a padlet to share all your ideas with your team.
        </p>
        <h2 className='login-text text-3xl font-bold my-4'>{ padletToCreate.code ? "Here's you padlet" : "Create"}</h2>
        <div className='w-[400px] my-4 h-max flex flex-col items-center justify-centers relative'>
          {
            !padletToCreate.code && 
            <form className='w-full h-max flex flex-col items-center justify-between' onSubmit={handleSubmit}>
              <input name="name" onChange={handleChange} type="text" className='px-4 mt-4 mb-8 w-[80%] py-1 text-xl login-text border rounded-full outline-none' placeholder="Enter the padlet name..."/>
              <select name="privacy" className='w-[120px] rounded-xl px-2 py-1 outline-none'>
                <option value>Privacy</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
              <button type="submit" className='w-[150px] border border-black flex items-center justify-center h-[40px] rounded-xl my-8 bg-black text-white font-normal text-xl'>Create</button>
            </form>
          }
          {
            padletToCreate.code && 
            <>
              <span className='login-text text-3xl font-bold my-6'>Padlet code: </span>
              <div className='w-[200px] py-2 border text-2xl border-black flex items-center justify-center font-semibold'>
                {padletToCreate.code}
              </div>
              <button onClick={handleRedirect} className='w-[200px] py-1 text-2xl bg-black text-white flex items-center justify-center font-semibold my-8'>
                <span className='mx-1'>Go now</span>
                <ArrowRightAlt className='text-white !w-9 mx-1 !h-9'/>
              </button>
            </>
          }
        </div>       
    </div>
  )
}

export default createRoomComponent