import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { route } from "./router";
import { store } from "./app/store";
import AuthInitializer from "./components/AuthInitializer";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const rootElement = document.getElementById("root");

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <AuthInitializer>
            <RouterProvider router={route} />
          </AuthInitializer>
        </Provider>
      </GoogleOAuthProvider>
    </StrictMode>,
  );
} else {
  console.error("Root element not found in DOM.");
}
