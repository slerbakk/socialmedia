import { baseUrl } from "../const/api.js";

/**
 * Follow a user by sending a PUT request to the follow endpoint.
 *
 * @function
 * @param {string} targetUserName - The username of the user to follow.
 * @returns {Promise<void>} A promise that resolves once the user has been successfully followed.
 * @throws {Error} Throws an error if the request fails.
 */
export async function followUser(targetUserName) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");

  if (!user || !token) {
    throw new Error("User is not logged in or access token is missing.");
  }

  const url = `${baseUrl}social/profiles/${targetUserName}/follow`; // Construct the follow URL

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": "02673c1b-3f77-450d-8a96-91c6ecec2731",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to follow the user");
    }
    alert(`Successfully followed ${targetUserName}`);
  } catch (error) {
    console.error(error);
    alert("An error occurred while trying to follow the user.");
  }
}

// unfollowUser.js
/**
 * Function to unfollow a user
 * @param {string} userName - The name of the user to unfollow.
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} Throws an error if the unfollow operation fails.
 */
export async function unfollowUser(userName) {
  const url = `${baseUrl}social/profiles/${userName}/unfollow`;

  const token = localStorage.getItem("accessToken");

  const options = {
    method: "PUT", // Using PUT to unfollow
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      "X-Noroff-API-Key": "02673c1b-3f77-450d-8a96-91c6ecec2731",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Failed to unfollow the user.");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
