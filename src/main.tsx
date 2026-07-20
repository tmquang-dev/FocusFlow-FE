import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { route } from './router'
import './index.css'

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={route} />
    </StrictMode>
  )
} else {
  console.error("Root element not found in DOM.")
}