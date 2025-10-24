// Import useState and useEffect hooks from React to manage state and side-effects
import { useState, useEffect } from "react";

// Import the SearchBar component (calls onSearch when user submits)
import SearchBar from "../components/Searchbar";

// Import BookCard component (renders a single book)
import BookCard from "../components/BookCard";

// Import axios for making HTTP requests to the Open Library API
import axios from "axios";

function Home() {
  // State to store books returned by a user search (initially an empty array)
  const [books, setBooks] = useState([]);

  // State to store any error message to show to the user (initially empty string)
  const [error, setError] = useState("");

  // State to track whether a request is in progress (boolean)
  const [loading, setLoading] = useState(false);

  // State to store featured books shown on first load (initially empty array)
  const [featured, setFeatured] = useState([]);

  // useEffect runs after the component mounts (because dependency array is [])
  useEffect(() => {
    // Define async function to fetch featured books
    const fetchFeatured = async () => {
      try {
        // Make GET request to Open Library searching for "React"
        const res = await axios.get(`https://openlibrary.org/search.json?q=React`);
        // Take first 8 results and set them into featured state
        setFeatured(res.data.docs.slice(0, 8));
      } catch (err) {
        // If request fails, log error to console (you could also setError here)
        console.error("Error fetching featured books:", err);
      }
    };

    // Call the async function to fetch featured books
    fetchFeatured();
  }, []); // empty array -> run once when component mounts

  // Function called by SearchBar when a search is performed
  const handleSearch = async (query) => {
    setLoading(true); // indicate loading started
    setError("");     // clear old errors

    try {
      // Fetch search results for the user's query
      const res = await axios.get(`https://openlibrary.org/search.json?q=${query}`);

      // If the API returned zero docs, set a friendly error message
      if (res.data.docs.length === 0) setError("No books found for this search.");

      // Put the API results into the books state (this will trigger a re-render)
      setBooks(res.data.docs);
    } catch (err) {
      // If request fails, show a generic error to the user
      setError("Error fetching books. Please try again.");
    }

    setLoading(false); // indicate loading finished
  };

  // JSX returned by the Home component
  return (
    <div className="home-container">
      {/* Render the search bar and pass the handleSearch function as a prop */}
      <SearchBar onSearch={handleSearch} />

      {/* If there are any searched books, render them in a grid */}
      {books.length > 0 && (
        <div className="book-grid">
          {books.map((book) => (
            // Each BookCard receives a book object; key helps React track list items
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}

      {/* While loading, show a centered loading message */}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {/* If there's an error message, show it in red */}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {/* 
        When there are no search results (books array empty) AND not loading,
        show a welcome message and the featured books.
      */}
      {books.length === 0 && !loading && (
        <> 
          <div style={{ textAlign: "center", marginTop: "30px", color: "#555" }}>
            <h2>Welcome to Bookshelf App </h2>
            <p>Search for your favorite books or explore topics like "Python", "Stories", "React", and more!</p>
          </div>

          <h3 style={{ marginLeft: "20px", color: "#2d3a8c" }}>Featured Books</h3>

          <div className="book-grid">
            {featured.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Export Home component to use in App.jsx
export default Home;
