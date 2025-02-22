import { getPosts } from "../posts/getPosts.js"; // Ensure correct path to getPosts

export function searchHandler() {
  const searchButton = document.getElementById("search-button");
  const searchQuery = document.getElementById("search-query");

  if (searchButton && searchQuery) {
    searchButton.addEventListener("click", () => {
      const query = searchQuery.value.trim();
      if (query) {
        getPosts(1, query); // Fetch posts based on the search query
      } else {
        console.log("No search query entered");
      }
    });
  }
}
