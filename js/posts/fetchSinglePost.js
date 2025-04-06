import { baseUrl, postsUrl, API_KEY } from "../constants/api.js";

export async function fetchSinglePost(postId) {
  const token = localStorage.getItem("LoginToken");

  // Construct URL to fetch a single post with author, comments, and reactions
  const url = `${baseUrl}${postsUrl}/${postId}?_author=true&_comments=true&_reactions=true`;

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

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching single post:", error);
    throw error;
  }
}
