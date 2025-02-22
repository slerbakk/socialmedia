import { registerHandler } from "./auth/registerHandler.js";
import { loginHandler } from "./auth/loginHandler.js";
import { renderProfile } from "./profile/profile.js";
import { getPosts } from "./posts/getPosts.js";
import { createPost } from "./posts/createPost.js";
import { fetchUserPosts } from "./profile/fetchUserPosts.js";
import { renderUserPosts } from "./profile/renderUserPosts.js";
import { searchHandler } from "./common/searchHandler.js";

function router() {
  const path = window.location.pathname;
  switch (path) {
    case "/index.html":
      getPosts();
      searchHandler();
      break;
    case "/account/register.html":
    case "/account/register":
      registerHandler();
      break;

    case "/account/login.html":
    case "/account/login":
      loginHandler();
      break;

    case "/account/profile.html":
    case "/account/profile":
      renderProfile();
      renderUserPosts();

      break;

    case "/post/create.html":
      break;
  }
}

router();
