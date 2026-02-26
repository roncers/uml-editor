import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/sass/main.scss'
import App from './App.tsx'
import './i18n/config'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
