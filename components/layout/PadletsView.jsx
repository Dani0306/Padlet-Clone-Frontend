import React, { useEffect } from 'react'
import IndividualPadlet from './IndividualPadlet'
import { useAppContext } from '../../context/AppContext'


const PadletsView = ({ socket }) => {

  const { padlets, setPadlets, user } = useAppContext();

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
    </div>
  )
}

export default PadletsView

