import { followUser, unfollowUser } from "../profile/followUser.js"; // Import follow/unfollow functions

// Function to render the follow/unfollow button
export async function renderFollowButton(authorName) {
  let loggedInUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");

  // If the user is not logged in, don't render the button
  if (!token || !loggedInUser) {
    return;
  }

  // Ensure that the 'following' property exists in loggedInUser
  if (!loggedInUser.following) {
    loggedInUser.following = [];
  }

  // Create the follow button container if it doesn't exist
  let followButtonContainer = document.querySelector(
    "#follow-button-container"
  );

  if (!followButtonContainer) {
    // Dynamically create the container if it doesn't exist
    followButtonContainer = document.createElement("div");
    followButtonContainer.id = "follow-button-container";
    document
      .querySelector(".post-container")
      .appendChild(followButtonContainer); // Append it to an appropriate parent
  }

  // Check if the current user is already following the post author
  let isFollowing = loggedInUser.following.includes(authorName);

  const followButton = document.createElement("button");
  followButton.id = "follow-button";
  followButton.textContent = isFollowing ? "Unfollow" : "Follow";
  followButton.classList.add(isFollowing ? "unfollow-button" : "follow-button");

  // Disable the button to prevent double-clicking
  followButton.disabled = false;

  // Add click event listener for follow/unfollow
  followButton.addEventListener("click", async () => {
    try {
      // Disable the button to prevent multiple clicks
      followButton.disabled = true;

      if (isFollowing) {
        // If already following, unfollow
        await unfollowUser(authorName);
        loggedInUser.following = loggedInUser.following.filter(
          (user) => user !== authorName
        );
        isFollowing = false; // Update the isFollowing state
        followButton.textContent = "Follow"; // Change button text
        followButton.classList.remove("unfollow-button");
        followButton.classList.add("follow-button");
      } else {
        // If not following, follow
        await followUser(authorName);
        loggedInUser.following.push(authorName);
        isFollowing = true; // Update the isFollowing state
        followButton.textContent = "Unfollow"; // Change button text
        followButton.classList.remove("follow-button");
        followButton.classList.add("unfollow-button");
      }

      // Save the updated user data to localStorage
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } catch (error) {
      console.error("Error while following/unfollowing user:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      // Enable the button again after the request finishes
      followButton.disabled = false;
    }
  });

  // Clear the previous button and append the updated one
  followButtonContainer.innerHTML = ""; // Clear previous content
  followButtonContainer.appendChild(followButton);
}
