import React from 'react'
import {Chart} from 'react-google-charts'
import MyDiv from './barChart.style'

export default function CustomBarChart(props) {
  return (
    <MyDiv>
      <Chart
        chartType="ColumnChart"
        data={props.data}
        options={props.options}
        width={'100%'}
      />
    </MyDiv>
  )
}

