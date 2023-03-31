import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'
import { Logo, FormRow, Alert } from '../components'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'


const intitialState = {
  name:'',
  email:'',
  password:'',
  isMember: true,
}

const Register = () => {

  const { showAlert, isLoading, displayAlert, registerUser, loginUser, user } = useContext(AppContext)

  const navigate = useNavigate()  

  const [values, setValues] = useState(intitialState)

  const handleChange = (e) => {
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const {name, email, password, isMember} = values
    if(!email || !password || (!isMember && !name)) {
      displayAlert()
      return
    }
    const currentUser = {name, email, password}
    if(isMember) {
      loginUser(currentUser)
    }
    else{
      registerUser(currentUser)
    }
  }

  const toggleMember = () => setValues((oldValues) => ({
    ...oldValues,
    isMember: !oldValues.isMember
  }))

  const loginRegisterTitle = values.isMember ? 'login' : 'register'

  const loginRegisterMessage = values.isMember ? 'Not a member yet? ' : 'Already a member? '
  
  const loginRegister = values.isMember ? 'Register' : 'Login'

  useEffect(() => {
    if(user) {
      setTimeout(() => {
        navigate('/')
        console.log(user)
      }, 3000)
    }
  },[user, navigate])

  return (
    <Wrapper>
    <form className='form' onSubmit={onSubmit}>
      <Logo />
      <h3>{loginRegisterTitle}</h3>
      {
      showAlert &&
      <Alert />
      }
      {!values.isMember && 
      <FormRow 
      type='text'
      name='name'
      value={values.name}
      handleChange={handleChange}
        />}
      <FormRow 
      type='text'
      name='email'
      value={values.email}
      handleChange={handleChange}
      />
      <FormRow 
      type='text'
      name='password'
      value={values.password}
      handleChange={handleChange}
      />
      <button type='submit' className='btn btn-block' disabled={isLoading}>
        Submit
      </button>
      <button
      type='button'
      className='btn btn-block btn-hipster'
      disabled={isLoading}
      onClick={() => loginUser({email: 'testUser@gmail.com', password: 'testsecret'})}>
        {isLoading ? 'loading...' : 'Demo App'}
      </button>
      <p>
       {loginRegisterMessage} 
       <button
       className='member-btn'
       onClick={toggleMember}>
       {loginRegister}
       </button>
      </p>
    </form>
    </Wrapper>
  )
}

export default Register