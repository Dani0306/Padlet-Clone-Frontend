import MainSectionDesign from '../components/layout/MainSectionDesign'
import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext'
import { jwtVerify } from 'jose'

export default function Home ({ serverUser }){

  const { setUser } = useAppContext();

  useEffect(() => {
    setUser(serverUser)
  }, [])

  return (
    <div className="w-full min-h-[92vh] max-h-max">
      <MainSectionDesign />
    </div>
  )
}


export async function getServerSideProps({ req }) {

  if(req.cookies.token !== undefined){
    try {
      const { payload: { email, username, profile  } } = await jwtVerify(req.cookies.token,  new TextEncoder().encode(process.env.NEXT_PUBLIC_TOKEN_SECRET));
      return {
        props: {
          serverUser: {
            email, username, profile
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  return {
    props: {
      serverUser: null
    }
  }
}