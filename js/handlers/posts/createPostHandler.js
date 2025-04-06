import { createPost } from "../../posts/createPost.js";
import { displayMessage } from "../../components/displayMessage.js";

export function createPostHandler() {
  const createPostForm = document.querySelector("#createPostForm");

  // Ensure form is available before attaching the event listener
  if (createPostForm) {
    createPostForm.addEventListener("submit", submitCreatePostForm);
  }
}

async function submitCreatePostForm(event) {
  // Prevent page reload
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const messageContainer = "#message";
  const fieldset = form.querySelector("fieldset");

  try {
    // Disable the form while processing
    if (fieldset) fieldset.disabled = true;

    // Check if the image form is empty, if so, delete the mediaUrl property
    if (data.mediaUrl.trim() === "") {
      delete data.mediaUrl;
    }

    // Adds mediaUrl to the post data if it exists
    if (data.mediaUrl) {
      postData.media = { url: data.mediaUrl };
    }

    // Remove empty fields from the post data
    if (data.body.trim() === "") {
      delete data.body;
    }

    // Construct the post data
    const postData = {
      title: data.title,
      body: data.body,
    };

    // Call the createPost function to send the data to the API
    await createPost(postData);

    // Display success message
    displayMessage(messageContainer, "green", "Post created successfully!");

    // resets the form after submission
    form.reset();
    setTimeout(() => {
      location.reload();
    }, 1500);
  } catch (error) {
    displayMessage(messageContainer, "red", error.message);
  } finally {
    // Re-enable the form after processing
    if (fieldset) fieldset.disabled = false;
  }
}
