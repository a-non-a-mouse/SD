import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/index/reset.css';
import './components/index/index.css';
import AppLoader from './components/appLoader/appLoader';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppLoader />
  </React.StrictMode>
);

document.addEventListener('touchmove', (e) => e.preventDefault, {
  passive: false,
});
