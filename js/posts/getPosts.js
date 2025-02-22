import { baseUrl } from "../const/api.js";
import { renderPosts } from "./renderPosts.js";
import { updatePagination } from "../common/pagination.js";
import { searchHandler } from "../common/searchHandler.js";

const postsEndpoint = "social/posts";
const postsPerPage = 12; // Limit of posts per page

export async function getPosts(page = 1, query = "", authorName = "") {
  // Get the token from localStorage
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.error("No access token found in localStorage.");
    return;
  }

  let url = "";

  if (authorName) {
    // Fetch posts from a specific author
    url = `${baseUrl}social/profiles/${encodeURIComponent(
      authorName
    )}/posts?limit=${postsPerPage}&page=${page}`;
  } else if (query) {
    // Search posts
    url = `${baseUrl}${postsEndpoint}/search?q=${encodeURIComponent(
      query
    )}&limit=${postsPerPage}&page=${page}`;
  } else {
    // Fetch general posts
    url = `${baseUrl}${postsEndpoint}?_author=true&limit=${postsPerPage}&page=${page}`;
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // Use the token from localStorage
      "X-Noroff-API-Key": "02673c1b-3f77-450d-8a96-91c6ecec2731", // Your API key
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Error fetching posts");
    }

    renderPosts(json.data);

    // Pagination Meta
    const meta = json.meta;
    if (meta) {
      updatePagination(meta); // Pass meta for pagination
    } else {
      console.log("No pagination data found in the response");
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}
