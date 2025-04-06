import { checkUserStatus } from "../auth/checkUserStatus.js";

export function renderNavbar() {
  // Check if the user is logged in
  const userLoggedIn = checkUserStatus();

  // Get the current path to highlight the active link
  const currentPath = window.location.pathname;

  // Navbar HTML structure
  const navbar = `
      <nav class="bg-gray-800 text-white p-3">
        <div class="container mx-auto flex-row flex justify-between items-center">
          <div>
            <a href="${userLoggedIn ? "/profile/" : "/"}">
              <img src="/img/logo.png" alt="Logo" class="max-h-10 max-w-10" />
            </a>
          </div>
  
          <button
            aria-label="Toggle navigation menu"
            id="menu-btn"
            class="md:hidden hover:text-green-500"
          >
            <svg
              class="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
  
          <div
            id="menu"
            class="hidden flex flex-col gap-5 mt-3 md:mt-0 absolute top-12 left-0 w-full bg-gray-800 p-3 md:flex md:flex-row md:static md:w-auto md:p-0"
          >

            <!-- Conditional rendering based on login status -->
            ${
              userLoggedIn
                ? `            <a href="/feed/" class="font-semibold ${
                    currentPath === "/feed/"
                      ? "text-green-500"
                      : "hover:text-green-500"
                  } transition duration-300">Feed</a>

            <a href="/profile/" class="font-semibold ${
              currentPath === "/profile/" ||
              currentPath === "/profile/index.html"
                ? "text-green-500"
                : "hover:text-green-500"
            } transition duration-300">Profile</a>
                    <a href="#" id="logout-btn" class="font-semibold hover:text-red-500 transition duration-300">Logout</a>
                    
                  `
                : `
                    <a href="/" class="font-semibold ${
                      currentPath === "/"
                        ? "text-green-500"
                        : "hover:text-green-500"
                    } duration-300">Login</a>
                    <a href="/register.html" class="font-semibold ${
                      currentPath === "/register.html"
                        ? "text-green-500"
                        : "hover:text-green-500"
                    } duration-300">Register</a>
                     
                  `
            }
          </div>
        </div>
      </nav>
    `;

  // Insert the navbar into the header element
  const header = document.querySelector("header");
  header.innerHTML = navbar;

  // Toggle the menu for mobile view
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }

  // Logout functionality (if logged in)
  if (userLoggedIn) {
    const logoutBtn = document.getElementById("logout-btn");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        // Remove user data and token from localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("LoginToken");

        // Redirect to the login page
        window.location.href = "/";
      });
    }
  }
}
