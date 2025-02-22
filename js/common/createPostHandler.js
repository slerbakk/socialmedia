import { createPost } from "../posts/createPost.js";

export function createPostHandler(event) {
  event.preventDefault(); // Prevent default form submission (page reload)

  const form = event.target;
  const titleInput = form.querySelector('input[name="title"]');
  const bodyInput = form.querySelector('textarea[name="body"]');
  const mediaUrlInput = form.querySelector('input[name="mediaUrl"]');

  // Validate form fields
  if (!titleInput || !bodyInput || !mediaUrlInput) {
    document.getElementById("message").innerText =
      "Some form fields are missing.";
    return;
  }

  const title = titleInput.value;
  const body = bodyInput.value;
  const mediaUrl = mediaUrlInput.value;

  // Validate fields again to ensure they are not empty
  if (!title || !body || !mediaUrl) {
    document.getElementById("message").innerText = "Please fill in all fields.";
    return;
  }

  // Prepare post data
  const postData = {
    title: title,
    body: body,
    media: {
      url: mediaUrl,
    },
  };

  // Call createPost to submit the post
  createPost(postData)
    .then(() => {
      document.getElementById("message").innerText =
        "Post created successfully!";
      form.reset(); // Reset form after successful submission
    })
    .catch((error) => {
      document.getElementById("message").innerText =
        "Failed to create post. Please try again.";
    });
}

// Event listener to handle form submission when the document is loaded
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("createPostForm");

  if (form) {
    form.addEventListener("submit", createPostHandler); // Attach the form submission handler
  }
});
