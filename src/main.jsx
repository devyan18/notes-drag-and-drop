import SessionProvider from './providers/SessionProvider'
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import './index.css'

const element = document.getElementById('root')

ReactDOM
  .createRoot(element)
  .render(
    <React.StrictMode>
      <SessionProvider>
        <App />
      </SessionProvider>
    </React.StrictMode>
  )
