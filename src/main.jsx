import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import './index.css'
import App from './App.jsx'

const convexUrl = import.meta.env.VITE_CONVEX_URL

if (!convexUrl) {
  createRoot(document.getElementById('root')).render(
    <div style={{ padding: '20px', color: 'red' }}>
      Error: VITE_CONVEX_URL environment variable is not set.
    </div>
  )
} else {
  const convex = new ConvexReactClient(convexUrl)

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ConvexProvider client={convex}>
        <App />
      </ConvexProvider>
    </StrictMode>,
  )
}
