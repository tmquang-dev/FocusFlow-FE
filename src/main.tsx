import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { route } from './router'
import { store } from './app/store'
import './index.css'

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={route} />
      </Provider>
    </StrictMode>
  )
} else {
  console.error("Root element not found in DOM.")
}