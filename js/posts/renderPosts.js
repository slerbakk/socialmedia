import { getPosts } from "./getPosts.js";

export function renderPosts(posts) {
  const postsContainer = document.querySelector(".posts-container");
  postsContainer.innerHTML = ""; // Clear existing posts

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

    const authorName = post.author ? post.author.name || "Unknown" : "Unknown";

    // Create clickable link for author
    const authorLink = post.author
      ? `<a href="#" class="author-link" data-author="${authorName}">Author: ${authorName}</a>`
      : `<p class="author">Author: ${authorName}</p>`;

    const postLink = `/../post/post.html?id=${post.id}`;

    postElement.innerHTML = `
          <a href="${postLink}">
            <h3>${post.title}</h3>
            ${postImage}
            <p>${post.body || "No content"}</p>
            ${tags}
            ${authorLink}
            ${createdDate}
          </a>
        `;

    postsContainer.appendChild(postElement);
  });

  // Add event listener for author link clicks
  document.querySelectorAll(".author-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      const authorName = event.target.getAttribute("data-author");
      getPosts(1, "", authorName); // Fetch posts for this specific author
    });
  });
}
