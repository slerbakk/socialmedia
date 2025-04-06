import { registerHandler } from "./handlers/auth/registerHandler.js";
import { loginHandler } from "./handlers/auth/loginHandler.js";
import { createPostHandler } from "./handlers/posts/createPostHandler.js";
import { renderProfile } from "./handlers/profiles/renderProfile.js";
import { checkUserStatus } from "./auth/checkUserStatus.js";
import { renderAllPosts } from "./handlers/posts/renderAllPosts.js";
import { renderSinglePost } from "./handlers/posts/renderSinglePost.js";

export function router() {
  const pathname = window.location.pathname;

  switch (pathname) {
    case "/":
    case "/index.html":
      loginHandler();
      break;
    case "/register":
    case "/register.html":
      registerHandler();
      break;
    case "/profile/":
    case "/profile/index.html":
      renderProfile();
      break;

    case "/posts/":
    case "/posts/index.html":
      renderSinglePost();
    case "/feed/":
    case "/feed/index.html":
      // Redirects user to homepage if not signed in
      if (!checkUserStatus()) {
        window.location.href = "/index.html";
        return; // Prevent further execution if redirecting
      }
      createPostHandler();
      renderAllPosts();
      break;
    default:
      console.log("404 Not Found");
  }
}
