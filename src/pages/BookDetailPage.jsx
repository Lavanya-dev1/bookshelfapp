import { useParams, useNavigate } from "react-router-dom";
import BookDetail from "../components/BookDetail";

function BookDetailPage() {
  // Extract the 'id' parameter from the URL using useParams()
  // Example: if URL is /book/OL12345W, then id = "OL12345W"
  const { id } = useParams();

  // Initialize navigate function to allow going back or redirecting
  const navigate = useNavigate();

  return (
    <div className="book-detail-page">
      
      {/* Back Button to go to the previous page */}
      <button
        onClick={() => navigate(-1)} // go back one step in browser history
        style={{
          marginBottom: "20px",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          background: "#4e6ef2",
          color: "white",
          fontWeight: "500",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          transition: "0.3s",
        }}

        // Changes button color when mouse hovers over it
        onMouseOver={(e) => (e.currentTarget.style.background = "#2d3a8c")}

        // Resets color when mouse leaves
        onMouseOut={(e) => (e.currentTarget.style.background = "#4e6ef2")}
      >
        ⬅ Back
      </button>

      {/* Component that actually fetches and displays book details */}
      <BookDetail id={id} />
    </div>
  );
}

export default BookDetailPage;
