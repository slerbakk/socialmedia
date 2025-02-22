export function renderProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");

  // If the user isn't logged in and we're not already on the login or register page, redirect to the login page
  const path = window.location.pathname;

  // Check if the user is logged in and we are on a protected page
  if (
    (!token || !user) &&
    !path.includes("/account/login") && // Exclude login page
    !path.includes("/account/register") // Exclude register page
  ) {
    window.location.href = "./login.html";
    return;
  }

  // Render the user's profile data
  const profileContainer = document.querySelector("#profile-details");

  if (profileContainer) {
    const avatarUrl = user.avatar?.url || "default-avatar.jpg"; // If avatar is an object, use the url property
    const avatarAlt = user.avatar?.alt || `${user.name}'s Avatar`; // If avatar has an alt property, use it

    profileContainer.innerHTML = `
        <div>
          <h2>${user.name}</h2>
          <img src="${avatarUrl}" class="avatar" alt="${avatarAlt}" />
          <p>Email: ${user.email}</p>
          <p>Bio: ${user.bio}</p>
        </div>
      `;

    // Create the Log Out button
    const logoutButton = document.createElement("button");
    logoutButton.classList.add("button-logout");
    logoutButton.textContent = "Log Out";

    // Add event listener to the Log Out button
    logoutButton.addEventListener("click", function () {
      // Remove user data and token from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");

      // Redirect to the login page after logging out
      window.location.href = "./login.html";
    });

    // Append the Log Out button to the profile container
    profileContainer.appendChild(logoutButton);
  }
}
