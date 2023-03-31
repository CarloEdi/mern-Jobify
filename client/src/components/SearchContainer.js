import React, { useContext, useState, useMemo } from 'react'
import { FormRow, FormRowSelect } from '../components'
import Wrapper from '../assets/wrappers/SearchContainer'
import { AppContext } from '../context/AppContext'

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters
  } = useContext(AppContext)

  const [localSearch, setLocalSearch] = useState('')

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value })
  }
  
  const debounce = () => {
    let timeoutId;
    return (e) => {
      setLocalSearch(e.target.value)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value })
      }, 1000)
    }
  }

  const optimizedDebounce = useMemo(() => debounce(), [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLocalSearch('')
    clearFilters()
  }
  return (
    <Wrapper>
      <form className='form'>
        <h4>Search Form</h4>
        <div className='form-center'>
          {/* search position */}
          <FormRow 
          type='text'
          name='search'
          value={ localSearch }
          handleChange={ optimizedDebounce }
          />
          {/* search by status */}
          <FormRowSelect
          labelText='job status'
          name='searchStatus'
          value={ searchStatus } 
          handleChange={ handleSearch }
          list={['all', ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect 
          labelText='job type'
          name='searchType'
          value={ searchType }
          handleChange={ handleSearch }
          list={['all', ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect 
          name='sort'
          value={ sort }
          handleChange={ handleSearch }
          list={ sortOptions }
          />
          <button 
          className='btn btn-block btn-danger'
          disabled={ isLoading }
          onClick={ handleSubmit }
          >clear filters</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer