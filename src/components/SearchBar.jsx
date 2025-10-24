// Import useState hook from React — allows this component to have internal state
import { useState } from "react";
// Define the SearchBar component — accepts a prop called 'onSearch'
function SearchBar({onSearch}){
       // Create a state variable 'query' to store the current input value
    // setQuery is the function used to update 'query'
    const[query,setQuery]=useState("");
    // Function to handle form submission
    const handleSubmit=(e)=>{
e.preventDefault(); // Prevent the default browser behavior (page reload)
if (query.trim()) onSearch(query);
    };
    // Render the search form
    return(
        <form onSubmit={handleSubmit} className="search-bar">
            <input
            type="text" // Input type is text
            value={query}  // Value is controlled by 'query' state
            onChange={(e)=> setQuery(e.target.value)} // Update state on typing
            placeholder="Search For Books.." // Placeholder text inside the input
            />
            <button type="submit"> Search </button>

        </form>
    );
}
// Export the SearchBar component so it can be imported in Home
export default SearchBar;