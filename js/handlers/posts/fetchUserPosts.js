import { baseUrl, API_KEY } from "../../constants/api.js";

export async function fetchUserPosts(username) {
  const token = localStorage.getItem("LoginToken");

  // Construct the URL to fetch user posts based on the username
  const url = `${baseUrl}social/profiles/${username}/posts`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      console.error(`Error fetching posts for user ${username}:`, data);
      return null;
    }

    // Check if there is no data or empty posts
    if (!data || !data.data || data.data.length === 0) {
      console.warn(`No posts found for ${username}.`);
      return []; // Return an empty array if no posts are found
    }

    return data.data; // Return the user posts from the API
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return null;
  }
}
