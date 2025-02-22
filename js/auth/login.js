/**
 * Logs in a user by sending a POST request to the login endpoint.
 *
 * This function sends a `POST` request with the user's credentials to the authentication
 * API. If the login is successful, the response containing user data and the authentication token
 * is returned. If there's an error during the login process, it throws an error with a specific message.
 *
 * @function
 * @param {Object} user - The user credentials for login.
 * @param {string} user.email - The user's email.
 * @param {string} user.password - The user's password.
 *
 * @returns {Promise<Object>} A promise that resolves to the JSON response from the server containing user data and authentication details.
 * @throws {Error} Throws an error if the login fails, with an optional error message from the server.
 */
import { baseUrl } from "../const/api.js";
export async function login(user) {
  const url = `${baseUrl}auth/login`;

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
      throw new Error(json.errors?.[0]?.message || "Login failed");
    }

    return json;
  } catch (error) {
    throw error;
  }
}
