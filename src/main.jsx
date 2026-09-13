import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeState } from './state/ThemeState.jsx'
import { SavedState } from './state/SavedState.jsx'
import { AlertState } from './state/AlertState.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeState>
        <SavedState>
          <AlertState>
            <App />
          </AlertState>
        </SavedState>
      </ThemeState>
    </BrowserRouter>
  </React.StrictMode>
)