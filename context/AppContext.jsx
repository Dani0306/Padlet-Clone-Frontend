import { createContext, useContext, useState } from 'react'


const Context = createContext({
    showNavbar: false, 
    setShowNavbar: () => {}, 
    user: null, 
    setUser: () => {},
    showProfileModal: false, 
    setShowProfileModal: () => {}, 
    showAsideBar: false, 
    setShowAsideBar: () => {},
    padlets: [], 
    setPadlets: () => {}, 
    showCreateModal: false,
    setShowCreateModal: () => {}, 
    loading: false, 
    setLoading: () => {}
})



export default function AppContextProvider ({ children }) {
    const [showNavbar, setShowNavbar] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showAsideBar, setShowAsideBar] = useState(false)
    const [user, setUser] = useState(null)
    const [padlets, setPadlets] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [loading, setLoading] = useState(false)

    const value = {
        showNavbar, setShowNavbar,  user, setUser, showProfileModal, setShowProfileModal, showAsideBar, setShowAsideBar, padlets, setPadlets, showCreateModal, setShowCreateModal, loading, setLoading
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )

}


export const useAppContext = () => useContext(Context)