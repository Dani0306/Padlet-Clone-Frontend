import React, { useEffect, useRef } from 'react'
import { jwtVerify } from 'jose'
import { useAppContext } from '../../context/AppContext'
import { io } from 'socket.io-client'
import { host } from '../../variables'
import PadletAsideBar from '../../components/functionality/PadletAsideBar'
import PadletsView from '../../components/layout/PadletsView'
import axios from 'axios'


const Room = ({ user, room, padlets }) => {

  const socket = useRef(null)
  const { setUser, setPadlets } = useAppContext();


  useEffect(() => {
    if(room && user){
      socket.current = io(host);
      socket.current.emit("join_room", room)
      setUser(user)
      setPadlets([...padlets])
    }
  }, [user, room, padlets])


  return (
    <div className='w-full h-screen scrollbar-hide'>
      {
        room && user ? <>
          <PadletAsideBar room={room} socket={socket}/>
          <PadletsView socket={socket} room={room} />
        </> : 
        <>
          <div className='w-full h-full flex items-center justify-center'>
            <div className='bg-white w-[300px] md:w-[500px] h-[250px] md:h-[300px] flex items-center justify-center'>
              <span className='max-w-[80%] text-center text-xl'>You are not allowed to access to this private padlet room, ask the owner to add you as a member.</span>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Room


export async function getServerSideProps ({ req, query }) {

  const { payload: { email, username, profile  } } = await jwtVerify(req.cookies.token,  new TextEncoder().encode(process.env.NEXT_PUBLIC_TOKEN_SECRET));
  const user = { email, username, profile }
  const padlet = await axios.get(host + "/padlet/padlets/" + query.room);

  if(!padlet.data.padlet.members.includes(user.email)) {
    return {
      props: {
        user: null, 
        room: null,
        padlets: null
      }
    }
  }

  return {
    props: {
      user, 
      room: query.room, 
      padlets: padlet.data.padlet.padlets
    }
  }
}
