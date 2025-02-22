import { baseUrl } from "../const/api.js";

export async function fetchUserPosts(userName) {
  const token = localStorage.getItem("accessToken"); // Get the token from localStorage
  const url = `${baseUrl}social/profiles/${userName}/posts`; // Construct the URL for the user's posts

  const options = {
    method: "GET",
    headers: {
      "X-Noroff-API-Key": "02673c1b-3f77-450d-8a96-91c6ecec2731",
      Authorization: `Bearer ${token}`, // Use the token from localStorage
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    console.error("Failed to fetch user posts");
    return []; // Return an empty array if the fetch fails
  }

  const data = await response.json();

  return data.data || []; // Access the 'data' array, which contains the posts
}
