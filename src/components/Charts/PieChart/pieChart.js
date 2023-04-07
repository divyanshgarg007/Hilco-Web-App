import React from 'react'
import {Chart} from 'react-google-charts'
import MyDiv from './pieChart.style'

export default function CustomPieChart(props) {
  return (
    <MyDiv>
      <Chart
        chartType="PieChart"
        data={props.data}
        options={props.options}
        width={'100%'}
      />
    </MyDiv>
  )
}

