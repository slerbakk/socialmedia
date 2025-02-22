import { baseUrl } from "../const/api.js";

// Function to handle the form submission and update the post
export async function editPostHandler(postId) {
  const updatedPost = {
    title: document.getElementById("post-title").value,
    body: document.getElementById("post-body").value,
    tags: document
      .getElementById("post-tags")
      .value.split(",")
      .map((tag) => tag.trim()),
    media: {
      url: document.getElementById("post-media-url").value,
    },
  };

  try {
    const response = await updatePost(postId, updatedPost);

    if (response.ok) {
      alert("Post updated successfully");
      window.location.reload(); // Reload the page to show updated post
    } else {
      const errorData = await response.json();
      alert(`Error updating post: ${errorData.errors[0].message}`);
    }
  } catch (error) {
    console.error("Error updating post:", error);
  }
}

// Make the API request to update the post
async function updatePost(postId, postData) {
  const url = `${baseUrl}social/posts/${postId}`;
  const accessToken = localStorage.getItem("accessToken");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "X-Noroff-API-Key": "02673c1b-3f77-450d-8a96-91c6ecec2731",
    },
    body: JSON.stringify(postData),
  };

  return await fetch(url, options);
}
