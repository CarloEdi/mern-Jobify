import React, { useState, useContext } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import Logo from './Logo'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
const [showLogout, setShowLogout] = useState(false)
const { user, logoutUser, toggleSidebar } = useContext(AppContext)
  return (
    <Wrapper>
        <div className='nav-center'>
            <button 
            className='toggle-btn'
            onClick={ toggleSidebar }>
                <FaAlignLeft />
            </button>
            <div>
                <Logo />
                <h3 className='logo-text'>Dashboard</h3>
            </div>
            <div className='btn-container'>
                <button 
                className='btn'
                onClick={() => setShowLogout((prevShowLogout) => !prevShowLogout)}
                >
                    <FaUserCircle />
                    {user && user.name}
                    <FaCaretDown />
                </button>
                <div className={ showLogout ? 'dropdown show-dropdown' : 'dropdown' }>
                    <button 
                    className='dropdown-btn'
                    onClick={ logoutUser }>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </Wrapper>
  )
}

export default Navbar