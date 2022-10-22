import React, { useEffect, useRef } from 'react'
import { AddPhotoAlternate, Close } from '@mui/icons-material'
import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { storage } from '../../firebase/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import axios from 'axios'
import { host } from '../../variables'

const CreatePadlet = ({ socket, room }) => {

  const { padlets, setPadlets, user, setShowCreateModal, setLoading } = useAppContext();
  const fileRef = useRef(null);
  const [tempUrl, setTempUrl] = useState("");
  const [file, setFile] = useState(null);
  const [padlet, setPadlet] = useState({
    title: "", 
    image: "", 
    owner: user, 
    content: "",
    code: room
  });


  const handleChange = e => {
    const { name, value } = e.target;

    setPadlet({ ...padlet, [name]: value })

  }

  const handleChangeImage = (e) => {
    let f = e.target.files[0];
    setFile(f)
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.addEventListener("loadend", () => {
      let url = URL.createObjectURL(f);
      setTempUrl(url)
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    const storageRef = ref(storage, `padlet/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", () => {}, (e) => console.log(e), () => {
      getDownloadURL(storageRef).then(async (url) => {

        socket.current.emit("create_padlet", { ...padlet, image: url })
        setPadlets([...padlets, { ...padlet, image: url }])

        await axios.post(host + "/padlet/createModal", { ...padlet, image: url })

      }).finally(() => {
        setShowCreateModal(false)
      })
    })
  }

  useEffect(() => {
    setLoading(false)
  }, [padlets])

  const closeCreateModal = () => setShowCreateModal(false);

  return (
  <form onSubmit={handleSubmit} className='w-[90%] md:w-[500px] z-50 h-[650px] rounded-xl top-[3vh] bg-white absolute md:bottom-[2%] md:left-[150%] flex flex-col items-center justify-center'>
    <button type="button" className='absolute z-10 right-3 top-3' onClick={closeCreateModal}>
      <Close className='!w-7 !h-7'/>
    </button>
    <h2 className='text-black text-xl md:text-3xl font-semibold my-6 pl-2'>Create your idea</h2>
    <div className='input-container'>
      <input onChange={handleChange} value={padlet.title} name='title' type="text" id='name' className='text-input' autoComplete='off' placeholder='Enter the title' required />
      <label className='label' htmlFor="name">Title</label>
    </div>
     <div className='input-container'>
      {
        !tempUrl ? 
        <>
          <div onClick={() => fileRef.current.click()} className='w-full h-[150px] border-[#444] flex-col border-2 border-dashed flex items-center justify-center'>
            <h2 className='text-base text-[#777]'>Add an picture</h2>
            <AddPhotoAlternate className="w-[50px] h-[50px] text-[#777]"/>
            </div>
            <input onChange={handleChangeImage} ref={fileRef} type="file" id="file" className='hidden' />
        </> : 
        <>
          <img src={tempUrl} className='w-[400px] h-[200px] object-cover' alt="image" />
        </>
      }
    </div>
    <div className='input-container'>
      <textarea onChange={handleChange} value={padlet.content} name='content' type="text" id='message' className='text-input' rows='3' autoComplete='off' placeholder='Type whatever you want' required />
      <label className='label' htmlFor="message">Type whatever you want</label>
    </div>
    <div className='input-container flex items-center justify-center'>
      <button className='w-[200px] hover:scale-105 transition-all duration-500 py-2 text-black border-black border-2 mx-auto'>
        Post
      </button>
    </div>
  </form> 

  )
}

export default CreatePadlet