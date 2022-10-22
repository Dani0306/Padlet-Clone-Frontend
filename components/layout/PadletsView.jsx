import React, { useEffect } from 'react'
import IndividualPadlet from './IndividualPadlet'
import { useAppContext } from '../../context/AppContext'
import { Add } from '@mui/icons-material';
import CreatePadlet from '../functionality/CreatePadlet';
import singletonRouter from 'next/router'


const PadletsView = ({ socket }) => {

  const { padlets, setPadlets, user, setShowCreateModal, showCreateModal } = useAppContext();

  useEffect(() => {
    socket?.current?.on("add_padlet", (padlet) => {
      if(padlet.owner.email !== user.email) setPadlets(prev => [...prev, padlet]);
    })

    socket?.current?.on("remove_recieved", (id) => {
      setPadlets(padlets.filter(x => x.id !== id))
    })

  }, [socket.current])

  return (
    <div className='w-full place-items-center place-content-start absolute right-0 h-full grid grid-cols-1 md:grid-cols-2 lg:w-[95%] xl:grid-cols-3 2xl:grid-cols-4 p-6 gap-6'>
            {
              padlets.map((item, id) => <IndividualPadlet socket={socket} key={id} padlet={item} />)
            }
            <div onClick={() => setShowCreateModal(true)} className='w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center absolute right-3 top-[84vh]'>
              <Add className='w-7 h-7 text-white'/>
            </div>
            {showCreateModal && <CreatePadlet socket={socket} room={singletonRouter.query.room}/>}
    </div>
  )
}

export default PadletsView

