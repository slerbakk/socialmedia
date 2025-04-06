import { fetchUserProfile } from "./fetchUserProfile.js";
import { renderUserPosts } from "./../posts/renderUserPosts.js";

export async function renderProfile() {
  // Check if there is a `username` in the query string
  const urlParams = new URLSearchParams(window.location.search);
  const usernameFromQuery = urlParams.get("username");

  // Get logged-in user details and token from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("LoginToken");

  // If no user is logged in and username is provided, or if the user is not logged in
  if (!user || !token) {
    if (usernameFromQuery) {
      // Redirect to home if no user logged in and trying to access another user's profile.
      window.location.href = "/";
      return;
    } else {
      // Redirect to home if no user is logged in
      window.location.href = "/";
      return;
    }
  }

  let userData = null;

  // If no username in the query string, use the logged-in user's data
  if (!usernameFromQuery) {
    userData = user;
  } else {
    // Fetch the user profile from the API based on the username
    const response = await fetchUserProfile(usernameFromQuery);
    if (response && response.data) {
      userData = response.data; // Extract the user data from the API response
    } else {
      // Handle error if no data found or if the API call fails
      console.error("Error fetching user data");
      window.location.href = "/";
      return;
    }
  }

  // Render the user's profile data
  const profileContainer = document.querySelector("#profile-container");

  if (profileContainer) {
    profileContainer.innerHTML = `
      <img
        src="${userData.avatar?.url || "../img/default-avatar.png"}"
        alt="${userData.avatar?.alt || `${userData.name}'s avatar`}"
        class="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 class="text-xl font-semibold">${userData.name}</h2>
      <p class="text-gray-600 mb-8 italic">${userData.email}</p>
      <p class="mb-6">${
        userData.bio || "This user hasn't written a bio yet."
      }</p>
      <button
        aria-label="Follow user"
        class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded mt-3"
      >
        Follow
      </button>
      <div class="flex justify-between mt-4">
        <div>
          <h3 class="text-lg font-semibold">Followers</h3>
          <p>${userData._count?.followers || 0}</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold">Following</h3>
          <p>${userData._count?.following || 0}</p>
        </div>
      </div>
    `;
  }

  const profileName = userData.name;

  // Render the user's posts in the #userPosts
  const postsContainer = document.querySelector("#userPosts");

  if (postsContainer) {
    try {
      // Call the renderUserPosts function with the correct profileName
      await renderUserPosts(profileName);
    } catch (error) {
      console.error("Error fetching posts for user", profileName, error);
    }
  }
}
