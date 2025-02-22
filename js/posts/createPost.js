import { baseUrl } from "../const/api.js";
import { createPostHandler } from "../common/createPostHandler.js";
// Endpoint for creating posts
const postsEndpoint = "social/posts";
const accessToken = localStorage.getItem("accessToken");

// Function to create a post by calling the API
export async function createPost(post) {
  const url = `${baseUrl}${postsEndpoint}`; // Combine baseUrl and postsEndpoint

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // Use access token from localStorage
      "X-Noroff-API-Key": "02673c1b-3f77-450d-8a96-91c6ecec2731", // API Key
    },
    body: JSON.stringify(post), // Convert the post object to JSON for the request
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Error creating post");
    }

    return json; // Return the created post details
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}
