import React, { useContext, useEffect } from 'react' 
import { AppContext } from '../context/AppContext'
import Job from './Job'
import Loading from './Loading'
import PageBtnContainer from './PageBtnContainer'
import Alert from './Alert'
import Wrapper from '../assets/wrappers/JobsContainer'

const JobsContainer = () => {
    const { getJobs, jobs, isLoading, page, totalJobs, search, searchStatus, searchType, sort, numOfPages, showAlert } = useContext(AppContext)
    useEffect(() => {
        getJobs()
        // eslint-disable-next-line
    }, [search, searchStatus, searchType, sort, page])

    if(isLoading) {
        return <Loading center/>
    }
    if(totalJobs === 0) {
        return(
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        )
    }
  return (
    <Wrapper>
        {showAlert && <Alert />}
        <h5>{totalJobs} job{totalJobs > 1 && 's'} found</h5>
        <div className='jobs'>
            {jobs.map((job) => {
                return <Job key={job._id} {...job} />
            })}
            
        </div>
        { numOfPages > 1 && <PageBtnContainer /> }
    </Wrapper>
  )
}

export default JobsContainer