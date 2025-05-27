import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

if (import.meta.env.VITE_MOCK_SERVER_ENABELD) {
  const { worker } = await import('./mocks/browser')
  worker.start({
    onUnhandledRequest: 'bypass'
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
