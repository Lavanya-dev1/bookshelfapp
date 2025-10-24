// Import the useNavigate hook from React Router
// useNavigate helps us programmatically navigate to another page (route)
import { useNavigate } from "react-router-dom";

// BookCard component receives one prop: "book"
// The "book" object contains data like title, author, and cover image
function BookCard({ book }) {

  // Initialize the navigate function
  // This allows redirection when a user clicks the "View Details" button
  const navigate = useNavigate();

  // Function that handles navigation when "View Details" is clicked
  const handleView = () => {
    // "book.key" usually looks like "/works/OL12345W"
    // We remove "/works/" part to get just "OL12345W"
    const bookId = book.key.replace("/works/", "");
    
    // Navigate to the book details page using the bookId
    // Example: /book/OL12345W
    navigate(`/book/${bookId}`);
  };

  // JSX for displaying the book card
  return (
    <div className="book-card">
      
      {/* Display the book's cover image */}
      {/* If "book.cover_i" exists, show the cover from OpenLibrary API */}
      {/* If not available, show a placeholder image */}
      <img
        src={
          book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://via.placeholder.com/150"
        }
        alt={book.title} // Accessibility: describes the image with book title
      />

      {/* Display the book title */}
      <h3>{book.title}</h3>

      {/* Display authors if available, else show 'Unknown Author' */}
      <p>{book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>

      {/* Button to view more details about the book */}
      <button onClick={handleView}>View Details</button>
    </div>
  );
}

// Export the component so it can be used in other files
export default BookCard;
