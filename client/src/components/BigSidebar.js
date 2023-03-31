import React, { useContext } from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import { AppContext } from '../context/AppContext'
import Logo from './Logo'
import NavLinks from './NavLinks'


const BigSidebar = () => {
  const { showSidebar } = useContext(AppContext)
  return (
    <Wrapper>
      <div className={ showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar