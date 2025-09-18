import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // This imports our global CSS
import App from './App'; // This imports our main App component
import reportWebVitals from './reportWebVitals'; // Keep for performance metrics

// Create the root React instance and attach it to the 'root' element in your public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside React's StrictMode for development checks
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Function to report web vital performance metrics (optional but standard)
reportWebVitals();