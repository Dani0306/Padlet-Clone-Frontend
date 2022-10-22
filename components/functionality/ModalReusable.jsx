import { Close } from '@mui/icons-material';
import React from 'react'
import { useRef } from 'react'

const ModalReusable = ({ children, root }) => {

  const ref = useRef(null);

  const callback = e => {
    root.unmount()
    document.getElementById('modal').remove();
    // ref.current.removeEventListener('animationend', callback);
  }


  const handleClick = () => {
    ref.current.classList.add('fadeOut');
    ref.current.addEventListener('animationend', callback, { once: true });
  }


  return (
    <div ref={ref} className='modalContainer z-30 w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,.93)] flex items-center justify-center'>
      <div className='modalView w-[350px] md:w-[500px] h-[500px]'>
        <button onClick={handleClick} className='absolute right-3 top-3'>
          <Close className='text-[#333] !w-8 !h-8'/>
        </button>
        {children}
      </div>
    </div>
  )
}

export default ModalReusable