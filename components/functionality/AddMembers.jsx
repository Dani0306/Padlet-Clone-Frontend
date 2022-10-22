import { Search, CheckCircleOutline } from '@mui/icons-material'
import { useState } from 'react'
import axios from 'axios';
import { host } from '../../variables';
import { useDebounce } from 'use-debounce'
import { useEffect } from 'react';
import UserBox from '../layout/UserBox';
import singletonRouter from 'next/router';

const AddMembers = () => {

    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);
    const [usersToAdd, setUsersToAdd] = useState([]);
    const [addesSuccess, setAddedSuccess] = useState(false);
    
    const [debounceValue] = useDebounce(email, 500)


    const handleChange = async e => {
        const { value } = e.target;
        setEmail(value);
        if(value === "") setUsers([]);
        
    }

    const getUsers = async () => {
        const response = await axios.get(host + "/auth/getUsers/" + email + "/" + singletonRouter.query.room);
        setUsers(response.data)
    }

    const add = (user) => {
        if(usersToAdd.includes(user)) {
            const newArr = usersToAdd.filter(x => x !== user);
            setUsersToAdd([...newArr])
        } else setUsersToAdd([...usersToAdd, user])
    }

    const addMembers = async () => {
        const response = await axios.post(host + "/padlet/addMembers", { code: singletonRouter.query.room, members: usersToAdd })
        if(response.status === 200){
            setAddedSuccess(true);
            setTimeout(() => setAddedSuccess(false), 2500);
        }
        
    }


    useEffect(() => {
        if(debounceValue) getUsers()
    }, [debounceValue])
    

  return (
    <div className='w-full h-full bg-white flex flex-col items-center bg-[rgba(255,255,255,.5)]'>
        <h1 className='text-4xl login-text mt-[100px] max-w-[400px] text-center mx-auto'>Add a member to your padlet</h1>
        <div className='min-w-[300px] w-[350px] mt-[80px] relative flex items-center'>
            <input onChange={handleChange} className='w-full login-text outline-none rounded-xl text-xl py-1 px-4' type="text" placeholder="Filter member by email ..." />
            {!email && <Search className='w-6 h-6 text-[#999] absolute right-2'/>}
        </div>
        <div className='scrollbar-hide w-[300px] max-h-[300px] mt-[10px] md:w-[400px] flex flex-col items-center overflow-y-scroll'>
            {
                users.map((user, index) => <UserBox key={index} user={user} add={add} usersToAdd={usersToAdd} />)
            }
        </div>

        <button onClick={addMembers} className='w-[250px] py-1 rounded-xl flex items-center justify-center my-8 border hover:scale-105 transition-all duration-500 bg-white font-bold text-base'>Add selected members</button>

        {
            addesSuccess && 
            <div className='member-added'>
                <span className='font-bold text-base copy-text'>Members added</span>
                <CheckCircleOutline className="w-7 h-7 rounded-full bg-green-500"/>
            </div>
        }

    </div>
  )
}

export default AddMembers