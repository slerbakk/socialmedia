import { baseUrl, API_KEY } from "../../constants/api.js";

export async function fetchUserProfile(username) {
  const token = localStorage.getItem("LoginToken");

  // Construct the URL to fetch user data based on the username
  const url = `${baseUrl}social/profiles/${username}`;

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
    return data; // Return the user data from the API
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null; // Return null if there was an error fetching the user data
  }
}
