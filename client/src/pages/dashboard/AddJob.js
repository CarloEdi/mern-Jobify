import React, { useContext } from 'react'
import { FormRow, FormRowSelect, Alert } from '../../components'
import { AppContext } from '../../context/AppContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'


const AddJob = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    isLoading,
    editJob
  } = useContext(AppContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!position || !company || !jobLocation) {
      displayAlert()
      return
    }
    if(isEditing) {
      editJob()
      return
    }
    createJob()
    console.log('create job!')
  }

  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({name, value})
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
        { showAlert && <Alert /> }
        <div className='form-center'>
          {/* position */}
          <FormRow 
          type='text'
          name='position'
          value={position}
          handleChange={handleJobInput}/>
          {/* company */}
          <FormRow 
          type='text'
          name='company'
          value={company}
          handleChange={handleJobInput}/>
          {/* jobLocation */}
          <FormRow 
          type='text'
          labelText='job location'
          name='jobLocation'
          value={jobLocation}
          handleChange={handleJobInput}/>
          {/* jobStatus */}
          <FormRowSelect 
          name='status' 
          labelText='status'
          value={status}
          handleChange={ handleJobInput }
          list={statusOptions} />
          {/* jobType */}
          <FormRowSelect 
          name='jobType' 
          labelText='job type'
          value={jobType}
          handleChange={ handleJobInput } list={jobTypeOptions} />
          <div className='btn-container'>
            <button 
            className='btn btn-block submit-btn'
            type='submit'
            onClick={handleSubmit}
            disabled={ isLoading }>  
              submit
            </button>
            <button 
            className='btn btn-block clear-btn'
            onClick={(e) => {
              e.preventDefault()
              clearValues()
            }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
