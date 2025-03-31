// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Correct import from App.js

ReactDOM.render(
  <App />,  // Render the App component
  document.getElementById('root')  // Ensure this matches the ID in your HTML
);
