import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />)
/* root.render(
    <App />
) */