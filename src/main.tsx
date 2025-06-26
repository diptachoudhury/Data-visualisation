// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';

// Access environment variables using import.meta.env
const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

// Check if variables are loaded to prevent runtime errors
if (!auth0Domain || !auth0ClientId) {
  throw new Error("Auth0 environment variables are not set. Please check your .env file.");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        // Use the environment variables here
        domain={auth0Domain}
        clientId={auth0ClientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);