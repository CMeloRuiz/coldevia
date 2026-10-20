import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// El CSS principal va primero: sus @import de Google Fonts tienen que quedar
// al comienzo del bundle final.
import './index.css'
import './styles/intro.css'
import App from './App.jsx'
import CurrencyProvider from './context/CurrencyProvider.jsx'
import LanguageProvider from './i18n/LanguageProvider.jsx'

// CurrencyProvider va por fuera: LanguageProvider consulta la moneda para
// sugerir USD cuando alguien pasa a inglés sin haber elegido una.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CurrencyProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </CurrencyProvider>
    </BrowserRouter>
  </StrictMode>,
)
