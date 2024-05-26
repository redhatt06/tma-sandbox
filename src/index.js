import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
      <TonConnectUIProvider actionsConfiguration={{
              twaReturnUrl: 't.me/tap_brin_bot/play',
          }} manifestUrl={`https://6813-176-42-28-222.ngrok-free.app/tonconnect-manifest.json`}>
      < App />
      </TonConnectUIProvider>

      
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
