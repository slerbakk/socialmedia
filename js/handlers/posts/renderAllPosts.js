import { fetchAllPosts } from "../../posts/fetchAllPosts.js";
import { checkUserStatus } from "../../auth/checkUserStatus.js";

export function renderAllPosts(posts) {
  const postsContainer = document.querySelector("#post-container"); // This is where posts will be inserted
  postsContainer.innerHTML = ""; // Clear existing posts if any

  if (!Array.isArray(posts)) {
    return;
  }

  posts.forEach((post) => {
    // Create the post container
    const postElement = document.createElement("div");
    postElement.classList.add(
      "bg-white",
      "p-4",
      "rounded",
      "shadow-ld",
      "hover:shadow-lg",
      "hover:bg-gray-100",
      "transition-all",
      "duration-300",
      "mb-4"
    );

    // Make the entire post clickable by wrapping it in an anchor tag
    const postLink = document.createElement("a");
    postLink.href = `/posts/?id=${post.id}`; // Redirect to the single post page
    postLink.classList.add("block"); // Make the anchor block-level for the whole post to be clickable
    postLink.setAttribute("aria-label", `View post titled "${post.title}"`); // Accessibility feature

    // Create a container for author and comments
    const infoElement = document.createElement("div");
    infoElement.classList.add("flex", "justify-between", "pb-4");

    // Add title
    const title = document.createElement("h2");
    title.classList.add("text-xl", "font-semibold", "text-center", "mb-4");
    title.textContent = post.title;

    // Add image if exists, else use a default one
    const img = document.createElement("img");
    img.src = post.media?.url || "../img/noimage.png"; // Default image if not provided
    img.alt = post.media?.alt || "No image available";
    img.classList.add("w-full", "h-32", "object-cover", "rounded", "mb-2");

    // Add post content with default text if no content is provided
    const content = document.createElement("p");
    content.classList.add("text-center", "break-words", "overflow-hidden");
    content.textContent =
      post.body?.length > 0 ? post.body : "No content available"; // Default text if not provided

    // Render author with a link
    const author = document.createElement("a");
    author.classList.add(
      "text-sm",
      "text-gray-500",
      "hover:text-green-500",
      "hover:underline"
    );
    author.textContent = post.author?.name;
    if (post.author?.name) {
      // When clicked, redirect to profile page with the username as query parameter
      author.href = `/profile/?username=${post.author?.name}`;
    }

    // Render number of comments if comments exist
    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("text-sm", "text-gray-500");
    if (Array.isArray(post.comments) && post.comments.length > 0) {
      commentsContainer.textContent = `${post.comments.length} comment(s)`; // Show number of comments
    } else {
      commentsContainer.textContent = "No comments";
    }

    // Append author, and comments to infoElement
    infoElement.appendChild(author);
    infoElement.appendChild(commentsContainer);

    // Append title, image, infoElement, and content to the post element
    postLink.appendChild(title);
    postLink.appendChild(img);
    postLink.appendChild(infoElement);
    postLink.appendChild(content);

    // Append the anchor-wrapped post element to the container
    postElement.appendChild(postLink);
    postsContainer.appendChild(postElement);
  });
}
// Async function to load posts
async function loadPosts() {
  try {
    const posts = await fetchAllPosts();
    renderAllPosts(posts); // Render the posts into the page
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// Check if the user is logged in and is on the feed page
if (
  checkUserStatus() &&
  (window.location.pathname === "/feed/" ||
    window.location.pathname === "/feed/index.html")
) {
  // Add the event listener only on the feed page when user is logged in
  document.addEventListener("DOMContentLoaded", loadPosts);
}
