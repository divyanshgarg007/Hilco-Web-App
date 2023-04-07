import React from 'react'
import MyDiv from './loader.style'

export default function Loader() {
  return (
    <MyDiv>
      <div className="preloader">
        <div className="lds-ellipsis"><div /><div /><div /></div>
      </div>
    </MyDiv>
  )
}
