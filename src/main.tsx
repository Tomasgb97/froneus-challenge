import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import App from '@app/app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <Router>
        <App />
      </Router>
    </PrimeReactProvider>
  </React.StrictMode>
);
