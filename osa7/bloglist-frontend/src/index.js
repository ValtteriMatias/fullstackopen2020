import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import './App.css'
import store from './store'

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>,
document.getElementById('root'))