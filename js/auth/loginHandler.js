import { login } from "./login.js";
import { errorHandler } from "../common/errorHandler.js";

export function loginHandler() {
  const form = document.querySelector(".login-form");
  if (form) {
    form.addEventListener("submit", loginUser);
  }
}

async function loginUser(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  try {
    const response = await login(data);
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: response.data.name,
        email: response.data.email,
        bio: response.data.bio,
        avatar: response.data.avatar,
      })
    );

    localStorage.setItem("accessToken", response.data.accessToken);
    window.location.href = "./profile.html";
  } catch (error) {
    errorHandler(".message", error.message);
  }
}
