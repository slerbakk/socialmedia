import { fetchUserPosts } from "./fetchUserPosts.js";
export async function renderUserPosts() {
  const userName = JSON.parse(localStorage.getItem("user"))?.name; // Fetch the username from localStorage
  if (!userName) {
    console.error("No username found in localStorage.");
    return;
  }

  const posts = await fetchUserPosts(userName);
  const postsContainer = document.querySelector(".posts-container");

  if (postsContainer) {
    // Clear the existing content in the posts container
    postsContainer.innerHTML = "";

    if (posts.length > 0) {
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        const postImage =
          post.media && post.media.url
            ? `<img src="${post.media.url}" alt="${
                post.media.alt || "Post image"
              }" class="post-image" />`
            : "";

        const tags =
          post.tags && post.tags.length > 0
            ? `<p class="tags">Tags: ${post.tags.join(", ")}</p>`
            : "";

        const createdDate = post.created
          ? `<p class="created-date">Posted on: ${new Date(
              post.created
            ).toLocaleDateString()}</p>`
          : "";

        const author = post.author
          ? `<p class="author">Author: ${post.author.name || "Unknown"}</p>`
          : "";

        const postLink = `/../post/post.html?id=${post.id}`;

        postElement.innerHTML = `
            <a href="${postLink}">
              <h3>${post.title}</h3>
              ${postImage}
              <p>${post.body || "No content"}</p>
              ${tags}
              ${author}
              ${createdDate}
            </a>
          `;

        postsContainer.appendChild(postElement);
      });
    } else {
      postsContainer.innerHTML = "<p>No posts available</p>";
    }
  }
}
