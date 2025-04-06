import { baseUrl, postsUrl, API_KEY } from "../constants/api.js";

export async function fetchAllPosts() {
  const token = localStorage.getItem("LoginToken");

  // Construct URL with query parameters to include author, comments, and reactions
  const url = `${baseUrl}${postsUrl}?_author=true&_comments=true&_reactions=true`;

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

    return data.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
