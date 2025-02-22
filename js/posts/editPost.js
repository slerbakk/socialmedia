import { editPostHandler } from "../common/editPostHandler.js";

export async function editPost(postId, postDetails) {
  // Create and show the edit form
  const postContainer = document.querySelector(".post-container");

  // Check if form already exists to avoid duplicates
  if (document.getElementById("edit-post-form-container")) {
    return; // Exit if the form is already displayed
  }

  const editFormHTML = `
      <div id="edit-post-form-container">
        <form id="edit-post-form">
          <input type="text" id="post-title" placeholder="Title">
          <textarea id="post-body" placeholder="Body"></textarea>
          <input type="text" id="post-tags" placeholder="Tags (comma-separated)">
          <input type="text" id="post-media-url" placeholder="Media URL">
          <button type="submit">Save Changes</button>
          <button type="button" id="cancel-edit-button">Cancel</button>
        </form>
      </div>
    `;

  // Append the form below the post container
  postContainer.innerHTML += editFormHTML;

  // Populate the form with the current post details
  populateEditForm(postDetails);

  // Set up event listener for form cancellation
  document
    .getElementById("cancel-edit-button")
    ?.addEventListener("click", function () {
      document.getElementById("edit-post-form-container").remove(); // Remove the form
    });

  // Prevent form submission from reloading the page and handle submission
  document
    .getElementById("edit-post-form")
    .addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent page reload on form submission
      editPostHandler(postId); // Call handler function to submit edited data
    });
}

// Populate the form with the post details
function populateEditForm(post) {
  document.getElementById("post-title").value = post.title;
  document.getElementById("post-body").value = post.body;
  document.getElementById("post-tags").value = post.tags.join(", ");
  document.getElementById("post-media-url").value = post.media?.url || "";
}
