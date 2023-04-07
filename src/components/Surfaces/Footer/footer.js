import React from 'react'
import Logo from '../../../images/footer_logo.png'
import MyDiv from './footer.style'

export default function Footer() {
  return (
    <MyDiv>
      <img src={Logo} alt="Hilco" />
    </MyDiv>
  )
}
