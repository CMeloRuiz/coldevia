import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// El CSS principal va primero: sus @import de Google Fonts tienen que quedar
// al comienzo del bundle final.
import './index.css'
import './styles/intro.css'
import App from './App.jsx'
import CurrencyProvider from './context/CurrencyProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </BrowserRouter>
  </StrictMode>,
)
