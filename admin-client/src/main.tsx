import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.tsx'
import QueryProvider from './components/providers/QueryPropider.tsx'

async function setup() {
  if (import.meta.env.VITE_MOCK_SERVER_ENABELD) {
    const { worker } = await import("./mocks/browser");
    worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

setup().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryProvider>
    </StrictMode>,
  );
}).catch((error) => {
  console.error("Error during setup:", error);
});
