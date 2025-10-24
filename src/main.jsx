// Import StrictMode from React — helps identify potential problems in the application during development
import { StrictMode } from 'react'

// Import createRoot method from ReactDOM — used to connect React components to the HTML root element
import { createRoot } from 'react-dom/client'

// Import BrowserRouter from react-router-dom — enables routing (page navigation) inside the app
import { BrowserRouter } from 'react-router-dom';

// Import the main App component which contains the entire application structure
import App from './App.jsx'

// Create a React root and render the App component inside the 'root' div (from index.html)
createRoot(document.getElementById('root')).render(
  // Wrap the app with BrowserRouter so routing features (like Routes, useNavigate, etc.) can be used
 <BrowserRouter>
    {/* StrictMode helps catch potential errors and warnings during development */}
    <StrictMode>
      {/* Render the main App component */}
      <App/>
    </StrictMode>
 </BrowserRouter>
)
