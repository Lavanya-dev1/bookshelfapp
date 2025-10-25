import './App.css'; // Import App.css for style
// Import the Header component 
import Header from "./components/Header";

// Import the Footer component 
import Footer from "./components/Footer";

// Import the Home page component — this will show the main content for the root route "/"
import Home from "./pages/Home";

// Import the BookDetailPage component — this will show details for a specific book using its id
import BookDetailPage from "./pages/BookDetailPage";

// Import Routes and Route from react-router-dom — used to define routing in the app
import { Routes, Route } from "react-router-dom";
 
// Main App component — acts as the root component for the React app
function App() {
  return (
    // Root container for the app
    <div className="app-container"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}>
      {/* Render the Header component at the top */}
      <Header />

      {/* Main content area with flex-grow to take available vertical space */}
      <div style={{ flex: 1 }}>
        {/* Define routing for the application */}
        <Routes>
          {/* Route for the homepage — renders the Home component when URL is "/" */}
          <Route index element={<Home />} />

          {/* Route for book details — renders BookDetailPage when URL matches "/book/:id" */}
          {/* ":id" is a dynamic parameter that can be accessed inside BookDetailPage */}
          <Route path="/book/:id" element={<BookDetailPage />} />
        </Routes>
      </div>

      {/* Render the Footer component at the bottom */}
      <Footer />
    </div>
  );
}

// Export the App component so it can be used in main.jsx 
export default App;
