import React from 'react';
import ReactDOM from 'react-dom/client';
import SessionProvider from './providers/SessionProvider';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </React.StrictMode>
);