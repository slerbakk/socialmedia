import { baseUrl } from "../const/api.js";
import { renderPostDetails } from "./renderPost.js";
import { renderFollowButton } from "../common/followButton.js"; // Import the follow/unfollow button rendering function

// Global variable to store the fetched post details
let postDetails = null;

const postId = new URLSearchParams(window.location.search).get("id");

if (postId) {
  fetchPostDetails(postId);
} else {
  console.error("No post ID found in the URL.");
}

// Function to fetch post details
async function fetchPostDetails(postId) {
  const url = `${baseUrl}social/posts/${postId}?_author=true`; // Request author data

  // Retrieve token from localStorage
  const accessToken = localStorage.getItem("accessToken");

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "X-Noroff-API-Key": "02673c1b-3f77-450d-8a96-91c6ecec2731",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(
        json.errors?.[0]?.message || "Error fetching post details"
      );
    }

    postDetails = json.data; // Store post data in the variable

    renderPostDetails(postDetails);
    renderFollowButton(postDetails.author.name); // Render the follow/unfollow button
  } catch (error) {
    console.error("Error fetching post details:", error);
  }
}
