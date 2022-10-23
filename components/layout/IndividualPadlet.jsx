import Image from 'next/image'
import { MoreVert, OpenInNew, Share, Delete, Edit } from '@mui/icons-material'
import { useState } from 'react'
import axios from 'axios';
import { host } from '../../variables';
import singletonRouter  from 'next/router';
import { useAppContext } from '../../context/AppContext';

const IndividualPadlet = ({ padlet, socket }) => {
  
  const [showModalOptions, setshowModalOptions] = useState(false);
  const { setPadlets, padlets } = useAppContext();
  const [showName, setShowName] = useState(false);

  const handleShowModalOptions = () => setshowModalOptions(!showModalOptions);

  
  const deletePadlet = async () => {
    const response = await axios.post(host + "/padlet/remove", { code: singletonRouter.query.room, id: padlet.id  })
    if(response.status === 200) {
      socket.current.emit("delete_padlet", { room: singletonRouter.query.room, id: padlet.id })
      setPadlets(padlets.filter(x => x.id !== padlet.id))
    }
  }

  
  return (
      <div className='relative w-[350px] rounded-xl px-4 h-max md:max-h-[500px] flex flex-col bg-white py-2'>
        <div onMouseOver={() => setShowName(true)} onMouseLeave={() => setShowName(false)} className='w-[30px] h-[30px] flex items-center justify-center absolute top-4 left-4'>
          <Image src={padlet.owner.profile} alt="Profile" className='rounded-full' width={30} height={30} objectFit="cover" />
        </div>
        {showName && 
        <div className='hover-name'>
          <span>{padlet.owner.email}</span>
        </div>}
        <div className='w-full h-[25%] flex padlets-center justify-center py-4'>
            <h2 className='text-center text-2xl font-semibold'>{padlet.title}</h2>
        </div>
        <div className='w-[90%] mx-auto h-[200px] flex justify-center relative'>
            <Image src={padlet.image} objectFit='cover' layout="fill" />
        </div>
        <div className='w-full h-[35%] break-words py-4 px-4'>
            <p className='max-w-full text-justify'>
            {padlet.content}
            </p>
        </div>
        <button onClick={handleShowModalOptions} className='absolute right-2 bottom-3'>
          <MoreVert className='w-6 h-6'/>
        </button>
        {showModalOptions && 
          <ul className='absolute bottom-[-70%] py-5 pb-6 pr-2 bg-black rounded-xl right-0 md:right-[-20%] flex flex-col items-center w-[200px] h-max'>
            <li className='text-white after:w-[80%] flex-col after:border-t after:border-white w-full text-base h-max py-2 flex items-end pr-3'>
               <div className='w-full h-full flex items-center py-1'>
                <OpenInNew className='w-5 h-5 mx-2'/> <span>Open post</span>
               </div>
            </li>
            <li className='text-white after:w-[80%] flex-col after:border-t after:border-white w-full text-base h-max py-2 flex items-end pr-3'>
               <div className='w-full h-full flex items-center py-1'>
                <Share className='w-5 h-5 mx-2'/> <span>Share item</span>
               </div>
            </li>
            <li className='text-white after:w-[80%] flex-col after:border-t after:border-white w-full text-base h-max py-2 flex items-end pr-3'>
          <div className='w-full h-full flex items-center py-1'>
            <Edit className='w-5 h-5 mx-2'/> <span>Edit</span>
          </div>
            </li>
            <li onClick={deletePadlet} className='text-red-600 after:w-[80%] flex-col after:border-t after:border-white w-full text-base h-max py-2 flex items-end pr-3'>
            <div className='w-full h-full flex items-center py-1'>
              <Delete className='w-5 h-5 mx-2'/> <span >Delete</span>
            </div>
            </li>
          </ul>}
    </div>
  )
}

export default IndividualPadlet