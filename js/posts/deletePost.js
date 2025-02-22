/**
 * Deletes a post by its ID and redirects to the index page upon success.
 *
 * This function makes a `DELETE` request to the server's API to delete the post with the specified `postId`.
 * It uses the access token stored in localStorage for authentication and includes the necessary headers
 * for the request. If the post is deleted successfully, the user is redirected to the index page.
 *
 * @function
 * @param {string} postId - The ID of the post to be deleted.
 * @returns {Promise<void>} A promise that resolves when the post is deleted successfully or rejects if there's an error.
 *
 * @throws {Error} If the API request fails or the post cannot be deleted.
 */

import { baseUrl } from "../const/api.js";
export async function deletePost(postId) {
  const url = `${baseUrl}social/posts/${postId}`;

  const accessToken = localStorage.getItem("accessToken");

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "X-Noroff-API-Key": "02673c1b-3f77-450d-8a96-91c6ecec2731",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error deleting post: ${response.statusText}`);
    }

    alert("Post deleted successfully");
    window.location.href = "/index.html"; // Redirect after success
  } catch (error) {
    console.error("Error deleting post:", error);
    alert("An error occurred while deleting the post.");
  }
}
