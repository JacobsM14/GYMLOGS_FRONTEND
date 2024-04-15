import React from 'react'
import App from './pages/App.jsx'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
