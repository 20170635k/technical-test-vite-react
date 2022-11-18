import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// StrictMode is usually used to know if oyu are coding properly in react, is a good practice to use StrictMode
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode> 
    <App />
  </React.StrictMode>
)
