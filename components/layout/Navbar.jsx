import { Menu, Login as LoginLogo, Person, Groups, Add, JoinFull, Edit } from '@mui/icons-material'
import { useAppContext } from '../../context/AppContext'
import openModal from '../functionality/openModal'
import Login from '../functionality/Login'
import Register from '../functionality/Register'
import Image from 'next/image'
import ProfileModal from '../functionality/ProfileModal'
import CreateRoomComponent from '../functionality/createRoomComponent'
import JoinPadletComponent from '../functionality/JoinPadletComponent'
import singletonRouter from 'next/router'
import AddMembers from '../functionality/AddMembers'

const Navbar = () => {

  const handleOpenModal = (component) => {
    openModal('ModalReusable', component)
  }

  const { showNavbar, setShowNavbar, user, setShowProfileModal, showProfileModal } = useAppContext();

  const handleShowNavbar = () => setShowNavbar(!showNavbar)

  return (
    <nav className='bg-black w-full h-[8vh]'>
      <div className='flex h-full mx-auto items-center justify-between px-6 w-full max-w-[1600px]'>
      <h2 className='text-2xl logo text-white'>Padlet</h2>
        <button onClick={handleShowNavbar} className='lg:hidden'><Menu className='!w-8 !h-8 text-white'/></button>

        <ul className={`${showNavbar ? 'left-0' : 'left-[-250px]'} z-20 top-[55px]  h-screen pl-2 py-20 lg:py-0 bg-black transition-all duration-1000 flex-col flex lg:flex-row absolute lg:left-auto lg:top-auto w-[250px] lg:relative lg:justify-between lg:items-center lg:w-max lg:h-full`}>
        {
          !user && <li className='text-white flex font-normal text-base mx-3 py-3 lg:py-0 lg:hover:scale-105 transition-all duration-500 cursor-pointer'>
          <span>About us</span>
          <Groups className='!w-6 !h-6 text-white mx-2'/>
        </li>
        }
          <li className='text-white flex font-normal text-base mx-3 py-3 lg:py-0 lg:hover:scale-105 transition-all duration-500 cursor-pointer'>
            {
              !user ? <>
                <span  onClick={() => handleOpenModal(Login)}>Login</span>
                <Person className='!w-6 !h-6 text-white mx-2'/> 
              </> : <>
              {
                singletonRouter.pathname.split("/").includes("[room]") ? <>
                  <span onClick={() => handleOpenModal(AddMembers)}>Add members</span>
                  <Add className='!w-6 !h-6 text-white mx-2'/>
                </> : <>
                  <span onClick={() => handleOpenModal(CreateRoomComponent)}>Create Padlet Room</span>
                  <Add className='!w-6 !h-6 text-white mx-2'/>
                </>
              }
              </>
            }
          </li>
          <li className='text-white flex font-normal text-base mx-3 py-3 lg:py-0 lg:hover:scale-105 transition-all duration-500 cursor-pointer'>
            {
              !user ? <>
                <span onClick={() => handleOpenModal(Register)}>Register</span>
                <LoginLogo className='!w-6 !h-6 text-white mx-2'/>
              </> : <>
                {
                  singletonRouter.pathname.split("/").includes("[room]") ? <>
                    <span onClick={() => ""}>Edit padlet</span>
                    <Edit className='!w-6 !h-6 text-white mx-2'/>
                  </> : 
                  <>
                    <span onClick={() => handleOpenModal(JoinPadletComponent)} >Join to a Padlet</span>
                    <Groups className='!w-6 !h-6 text-white mx-2'/>
                  </>
                }
              </>
            }
          </li>
          {
            user && 
            <li onClick={() => setShowProfileModal(true)} className='w-max h-max lg:h-full absolute lg:relative top-8 lg:top-auto flex items-center justify-center ml-4'>
              <Image src={user.profile} alt="Profile" className='rounded-full' width={40} height={40} objectFit="cover" />
              <span className='font-semibold text-white mx-3'>{user.username}</span>
            </li>
          }
        </ul>
          {
            showProfileModal && <ProfileModal />
          }
      </div>
    </nav>
  )
}

export default Navbar