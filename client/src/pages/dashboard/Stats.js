import React, { useEffect, useContext } from 'react'
import { StatsContainer, ChartsContainer, Loading } from '../../components'
import { AppContext } from '../../context/AppContext'

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useContext(AppContext)
  useEffect(() => {
    showStats()
    // eslint-disable-next-line
  }, [])
  if(isLoading) {
    return <Loading center />
  }
  return (
    <>
    <StatsContainer />
    { monthlyApplications.length > 0 && <ChartsContainer /> } 
    </>
  )
}

export default Stats