import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './assets/sass/index.scss';

import App from 'components/App';
import './utils/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      refetchInterval: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/filmoteka">
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
