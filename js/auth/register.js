/**
 * Registers a new user by sending a POST request to the registration endpoint.
 *
 * This function sends a `POST` request with the user's details to the registration API.
 * If the registration is successful, the response containing the user data and authentication token
 * is returned. If there's an error during the registration process, it throws an error with a specific message.
 *
 * @function
 * @param {Object} user - The user details for registration.
 * @param {string} user.email - The user's email address.
 * @param {string} user.password - The user's password.
 * @param {string} [user.name] - The user's name (optional).
 * @param {string} [user.avatar] - The URL of the user's avatar (optional).
 *
 * @returns {Promise<Object>} A promise that resolves to the JSON response from the server containing the user data and authentication details.
 * @throws {Error} Throws an error if the registration fails, with an optional error message from the server.
 */

import { baseUrl } from "../const/api.js";
export async function register(user) {
  const url = `${baseUrl}auth/register`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Registration failed");
    }

    return json;
  } catch (error) {
    throw error;
  }
}
