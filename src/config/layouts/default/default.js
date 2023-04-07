import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import {Container} from '@mui/material'
import {Footer, Header} from '../../../components'
import MyDiv from './default.style'

const AppLayout = (props) => {

  return (
    <MyDiv>
      <CssBaseline />
      <Header />
      <Container maxWidth={false}>
        <div className="site-layout">
          <div style={{overflow: 'initial'}}>
            <div className="site-layout-background" style={{padding: 24}}>
              {props.children}
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </MyDiv>
  )
}

export default AppLayout
