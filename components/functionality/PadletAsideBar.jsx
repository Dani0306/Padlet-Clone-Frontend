import { Add, Share, ThumbUp, AccessTime } from '@mui/icons-material';
import React from 'react'
import { useAppContext } from '../../context/AppContext'
import CreatePadlet from './CreatePadlet';

const PadletAsideBar = ({ socket, room }) => {

    const { setShowCreateModal, showCreateModal } = useAppContext();
    const handleShowCreateModal = () => setShowCreateModal(!showCreateModal)

  return (
    <div className="w-[80px] h-[92vh] bg-white absolute top-[8vh] left-0 hidden lg:flex lg:flex-col items-center z-50">
        <button onClick={handleShowCreateModal} className='z-10 absolute bottom-14 bg-black p-3 flex items-center justify-center rounded-full right-[-25px]'>
            <Add className='!w-8 !h-8 text-white'/>
        </button>
        <button className='my-4 flex flex-col items-center justify-center'> 
          <Share className='!w-8 !h-8 text-black'/>
          <span className='text-xs my-1'>Share</span>
        </button>
        <button  className='my-4 flex flex-col items-center justify-center'>
          <ThumbUp className='!w-8 !h-8 text-black'/>
          <span className='text-xs my-1'>Like</span>
        </button>
        <button  className='my-4 flex flex-col items-center justify-center'>
          <AccessTime className='!w-8 !h-8 text-black'/>
          <span className='text-xs my-1'>Recents</span>
        </button>
        {showCreateModal && <CreatePadlet socket={socket} room={room}/>}
    </div>
  )
}

export default PadletAsideBar