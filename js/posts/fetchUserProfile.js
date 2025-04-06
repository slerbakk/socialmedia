import { baseUrl, API_KEY } from "../constants/api.js";

export async function fetchUserProfile(username = null) {
  const token = localStorage.getItem("LoginToken");

  // If a username is passed in the query string, fetch that user's profile; otherwise, fetch the logged-in user's profile.
  const userToFetch =
    username || JSON.parse(localStorage.getItem("user"))?.name;

  // Construct the URL to fetch the user's profile
  const url = `${baseUrl}/social/profiles/${userToFetch}/`;

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
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}
