export function renderPostDetails(post) {
  const postContainer = document.querySelector(".post-container");

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

  postContainer.innerHTML = `
      <h1>${post.title}</h1>
      ${postImage}
      <p>${post.body || "No content"}</p>
      ${tags}
      ${author}
      ${createdDate}
      <button id="edit-button">Edit Post</button>
      <button id="delete-button">Delete Post</button>
    `;

  // Attach event listeners for edit and delete buttons
  document.getElementById("edit-button").addEventListener("click", function () {
    import("./editPost.js").then(({ editPost }) => {
      editPost(post.id, post);
    });
  });

  document
    .getElementById("delete-button")
    .addEventListener("click", function () {
      import("./deletePost.js").then(({ deletePost }) => {
        deletePost(post.id);
      });
    });
}
