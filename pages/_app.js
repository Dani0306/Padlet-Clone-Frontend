import '../styles/globals.css'
import AppContextProvider from '../context/AppContext'
import Layout  from '../components/layout/Layout'

function MyApp({ Component, pageProps }) {
  return (
    
      <AppContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContextProvider> 
  )
}

export default MyApp
