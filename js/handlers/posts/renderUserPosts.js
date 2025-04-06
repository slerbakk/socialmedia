import { fetchUserPosts } from "./../posts/fetchUserPosts.js";

export function renderUserPosts(username) {
  const postsContainer = document.querySelector("#userPosts");
  postsContainer.innerHTML = "";

  // Fetch posts for the specified user
  fetchUserPosts(username)
    .then((posts) => {
      if (!Array.isArray(posts)) {
        console.error("Invalid data received: posts should be an array.");
        return;
      }

      // Render each post for the user
      posts.forEach((post) => {
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
        postLink.setAttribute("aria-label", `View post titled "${post.title}"`);

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
          "hover:text-blue-500",
          "hover:underline"
        );
        author.textContent = post.author?.name;
        if (post.author?.name) {
          // When clicked, redirect to profile page with the username as query parameter
          author.href = `/profile/?username=${post.author?.name}`;
        }

        // Create containers for comments and reactions
        const commentsContainer = document.createElement("div");
        commentsContainer.classList.add("text-sm", "text-gray-500");

        const reactionsContainer = document.createElement("div");
        reactionsContainer.classList.add("text-sm", "text-gray-500");

        const commentCount = post._count?.comments || 0; // Get number of comments
        const reactionCount = post._count?.reactions || 0; // Get number of reactions

        // Set the content for comments and reactions
        commentsContainer.textContent = `${commentCount} comment(s)`;
        reactionsContainer.innerHTML = `❤️ ${reactionCount}`;

        // Add the comments and reactions to the infoElement, with justify-between to space them out
        const interactionsContainer = document.createElement("div");
        interactionsContainer.classList.add(
          "flex",
          "justify-between",
          "w-full"
        );

        interactionsContainer.appendChild(commentsContainer);
        interactionsContainer.appendChild(reactionsContainer);

        // Append author and interactionsContainer to infoElement
        infoElement.appendChild(interactionsContainer);
        infoElement.appendChild(author);

        // Append title, image, infoElement, and content to the post element
        postLink.appendChild(title);
        postLink.appendChild(img);
        postLink.appendChild(infoElement);
        postLink.appendChild(content);

        // Append the anchor-wrapped post element to the container
        postElement.appendChild(postLink);
        postsContainer.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching user posts:", error);
    });
}
