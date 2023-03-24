import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './assets/sass/index.scss';

import App from 'components/App';
import './utils/i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/filmoteka">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
