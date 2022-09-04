import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode basename={process.env.PUBLIC_URL}>
    <App />
  </React.StrictMode>
);
