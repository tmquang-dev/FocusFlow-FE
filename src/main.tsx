import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { route } from './router'
import { store } from './app/store'
import AuthInitializer from './components/AuthInitializer'
import './index.css'

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <AuthInitializer>
          <RouterProvider router={route} />
        </AuthInitializer>
      </Provider>
    </StrictMode>
  )
} else {
  console.error("Root element not found in DOM.")
}