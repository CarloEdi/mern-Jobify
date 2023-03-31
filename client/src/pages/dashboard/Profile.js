import React, { useState, useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { FormRow, Alert } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'


const Profile = () => {
  const { user, updateUser, showAlert, displayAlert, isLoading } = useContext(AppContext)

  const [name, setName] = useState(user && user.name)
  const [lastName, setLastName] = useState(user && user.lastName)
  const [email, setEmail] = useState(user && user.email)
  const [location, setLocation] = useState(user && user.location)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, lastName, email, location })
  }


  return (
    <Wrapper>
      <form className='form' onSubmit={ handleSubmit }>
        <h3>Profile</h3>
        { showAlert && <Alert /> }
        <div className='form-center'>
        <FormRow 
      type='text' name='name' value={ name } handleChange={(e) => setName(e.target.value)} />
      <FormRow 
      type='text' name='lastName' value={ lastName } handleChange={(e) => setLastName(e.target.value)} labelText='last name'/>
      <FormRow 
      type='text' name='email' value={ email } handleChange={(e) => setEmail(e.target.value)} />
      <FormRow 
      type='text' name='location' value={ location } handleChange={(e) => setLocation(e.target.value)} />
      <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile
