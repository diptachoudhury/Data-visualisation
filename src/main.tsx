// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    <Provider store={store}>
        <Auth0Provider
          domain="dev-801f84oe8budwof1.us.auth0.com"  
          clientId="ggQyaiPmEXBIPQNSjtjb0joUj6bmrwMK"      
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
        >
      <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);