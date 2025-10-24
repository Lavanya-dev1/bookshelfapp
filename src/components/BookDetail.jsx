import { useEffect, useState } from "react";
import axios from "axios";

// BookDetail receives 'id' as a prop from BookDetailPage
// Example: id = "OL12345W"
function BookDetail({ id }) {

  // State to store the fetched book data
  const [book, setBook] = useState(null);

  // State to track loading status
  const [loading, setLoading] = useState(true);

  // State to track error messages
  const [error, setError] = useState("");

  // useEffect runs when the component first loads or when 'id' changes
  useEffect(() => {

    // Inner async function to fetch data from API
    const fetchBook = async () => {
      setLoading(true);  // start loading
      setError("");      // clear old error

      try {
        // Fetch book details from OpenLibrary API using the ID
        const res = await axios.get(`https://openlibrary.org/works/${id}.json`);
        
        // Store the fetched data into state
        setBook(res.data);

      } catch (err) {
        // If something goes wrong (like network issue or invalid id)
        setError("Error fetching book details.");
      }

      // Stop loading once fetch completes (success or error)
      setLoading(false);
    };

    // Call the function to start fetching
    fetchBook();

  }, [id]); // dependency array ensures it re-runs only when 'id' changes

  // --- Conditional Rendering Section ---

  // If still loading, show a "Loading..." message
  if (loading) return <p style={{ textAlign: "center" }}>Loading book details...</p>;

  // If an error occurred, show it in red text
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  // If no book data was found
  if (!book) return <p style={{ textAlign: "center" }}>No details available.</p>;

  // --- Main JSX to display book details ---
  return (
    <div className="book-detail">

      {/* Book Cover Image */}
      <img
        src={
          book.covers
            ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
            : "https://via.placeholder.com/300x400"
        }
        alt={book.title}
      />

      {/* Book Title */}
      <h2>{book.title}</h2>

      {/* Authors Section (some books have multiple authors) */}
      {book.authors && (
        <p style={{ fontStyle: "italic", color: "#555" }}>
          {book.authors
            .map((author) => author.name || author.author?.key)
            .join(", ")}
        </p>
      )}

      {/* Book Description Section */}
      <p>
        {book.description
          ? typeof book.description === "string"
            ? book.description
            : book.description.value
          : "No description available."}
      </p>

      {/* Link to the book’s page on Open Library */}
      <a
        href={`https://openlibrary.org/works/${id}`}
        target="_blank" //Opens the link in a new browser tab
        rel="noopener noreferrer" //A security measure to prevent the new tab from accessing page data
      >
        View on OpenLibrary
      </a>
    </div>
  );d
}

export default BookDetail;
