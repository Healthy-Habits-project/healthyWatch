import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppProvider } from './AppContext';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);