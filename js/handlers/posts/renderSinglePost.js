import { fetchSinglePost } from "../../posts/fetchSinglePost.js";
export async function renderSinglePost() {
  const postContainer = document.querySelector("#post-container");
  postContainer.innerHTML = ""; // Clear existing content
  postContainer.classList.add("max-w-3xl", "mx-auto"); // Set max-width and center align

  try {
    const urlParams = new URLSearchParams(window.location.search);
    let postId = urlParams.get("id");

    if (!postId) {
      const pathSegments = window.location.pathname.split("/");
      const lastSegment = pathSegments[pathSegments.length - 1];

      if (lastSegment && !isNaN(lastSegment)) {
        postId = lastSegment;
      } else {
        const matches = lastSegment.match(/post-(\d+)/);
        if (matches && matches[1]) {
          postId = matches[1];
        }
      }
    }

    if (!postId) {
      postContainer.innerHTML =
        "<p>No post ID found in URL. Please check the URL and try again.</p>";
      return;
    }

    const post = await fetchSinglePost(postId);

    if (!post || typeof post !== "object") {
      console.error("Invalid post data received.");
      postContainer.innerHTML = "<p>Post not found.</p>";
      return;
    }
    document.title = post.title + " - Social";
    const postElement = document.createElement("div");
    postElement.classList.add("bg-white", "p-6", "rounded", "shadow-lg");

    const title = document.createElement("h1");
    title.classList.add("text-2xl", "font-bold", "mb-4", "text-center");
    title.textContent = post.title;

    const img = document.createElement("img");
    img.src = post.media?.url || "../img/noimage.png";
    img.alt = post.media?.alt || "No image available";
    img.classList.add("w-full", "h-64", "object-cover", "rounded", "mb-4");

    const content = document.createElement("p");
    content.classList.add("text-lg", "text-gray-700", "mb-4", "text-center");
    content.textContent =
      post.body?.length > 0 ? post.body : "No content available";

    const metaContainer = document.createElement("div");
    metaContainer.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "text-sm",
      "text-gray-500",
      "mb-4"
    );

    const author = document.createElement("a");
    author.classList.add("hover:text-blue-500", "hover:underline");
    author.textContent = `${post.author?.name || "Unknown"}`;
    if (post.author?.name) {
      author.href = `/profile/?username=${post.author.name}`;
    }

    const reactionsContainer = document.createElement("div");
    reactionsContainer.innerHTML = `❤️ ${
      post._count?.reactions || 0
    } reactions`;

    metaContainer.appendChild(author);
    metaContainer.appendChild(reactionsContainer);

    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("mt-6", "p-4", "bg-gray-100", "rounded");

    const commentsTitle = document.createElement("h2");
    commentsTitle.classList.add("text-xl", "font-semibold", "mb-2");
    commentsTitle.textContent = "Comments";

    commentsContainer.appendChild(commentsTitle);

    if (post.comments?.length > 0) {
      post.comments.forEach((comment) => {
        const commentElement = document.createElement("p");
        commentElement.classList.add(
          "text-gray-600",
          "border-b",
          "pb-2",
          "mb-2"
        );
        commentElement.textContent = comment.body;
        commentsContainer.appendChild(commentElement);
      });
    } else {
      const noComments = document.createElement("p");
      noComments.classList.add("text-gray-500");
      noComments.textContent = "No comments yet.";
      commentsContainer.appendChild(noComments);
    }

    postElement.appendChild(title);
    postElement.appendChild(img);
    postElement.appendChild(metaContainer);
    postElement.appendChild(content);
    postElement.appendChild(commentsContainer);

    postContainer.appendChild(postElement);
  } catch (error) {
    console.error("Error fetching and rendering post:", error);
    postContainer.innerHTML =
      "<p class='text-red-500'>Error loading post. Please try again later.</p>";
  }
}
