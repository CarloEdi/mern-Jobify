import React from 'react'
import Wrapper from '../assets/wrappers/ErrorPage'
import {Link} from 'react-router-dom'
import img from '../assets/images/not-found.svg'

const Error = () => {
  return (
    <Wrapper className='full-page'>
        <div>
        <img src={img} alt='not found'/>
        <h3>Error, Page Not Found</h3>
        <p>We can't seem to find the page you are trying to access</p>
        <Link to='/'>
        <h4>Go Back Home</h4>
        </Link>
        </div>
    </Wrapper>    
  )
}

export default Error