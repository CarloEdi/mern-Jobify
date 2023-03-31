import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import BarChartComponent from './BarChartComponent'
import AreaChartComponent from './AreaChartComponent'
import Wrapper from '../assets/wrappers/ChartsContainer'

const ChartsContainer = () => {
  const { monthlyApplications: data }  = useContext(AppContext)
  const [barChart, setBarChart] = useState(true)
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button 
      type='button'
      onClick={() => setBarChart(!barChart)}>
        { barChart ? 'Area Chart' : 'Bar Chart' }
      </button>
      { barChart ? <BarChartComponent data={ data } /> : <AreaChartComponent data={ data } /> }
    </Wrapper>
  )
}

export default ChartsContainer