import React, { useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import { jwtVerify } from 'jose'
import axios from 'axios';
import { host } from '../../variables';
import IndividualPadletPreview from '../../components/layout/IndividualPadletPreview';

const PadletHome = ({ serverUser, padlets }) => {

  const { setUser } = useAppContext();

  useEffect(() => {
    setUser(serverUser)
  }, [serverUser])
  
  return (
    <div className={`place-items-center place-content-start w-full h-screen ${padlets.length > 0 ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-4 lg:p-8 gap-6" : "flex items-center justify-center"} `}> 
      {
        padlets.length > 0 ? 
        <>
          {
            padlets.map((item, index) => <IndividualPadletPreview key={index} padlet={item} />)
          }
        </> : 
        <>
          <div className='bg-white h-[200px] flex items-center justify-center w-[300px] rounded-xl md:w-[400px] text-xl'>
            <p className="text-center max-w-[240px]">You do not have any padlet yet, create or join to a padlet to get started.</p>
          </div>
        </>
      }

          
    </div>
  )
}

export default PadletHome

export async function getServerSideProps ({ req }) {

    const { payload: { email } } = await jwtVerify(req.cookies.token,  new TextEncoder().encode(process.env.NEXT_PUBLIC_TOKEN_SECRET));
    const user = await axios.get(host + "/auth/user/" + email);
    const padlets = await axios.get(host + "/auth/padlets/" + user.data.user.email);

    return {
      props: {
        serverUser: user.status === 200 ? user.data.user : {}, 
        padlets: padlets.data.padlets
      }
    }

  
}
