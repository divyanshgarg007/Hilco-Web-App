import React from 'react'
import ReactDOM from 'react-dom'
import 'ka-table/style.css'
import './index.css'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import App from './views/App/App'
import reportWebVitals from './reportWebVitals'
import store from './redux/store'

// const store = configureStore()
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
