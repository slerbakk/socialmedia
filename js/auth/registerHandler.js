import { errorHandler } from "../common/errorHandler.js";
import { register } from "./register.js";
export function registerHandler() {
  const form = document.querySelector(".register-form");
  if (form) {
    form.addEventListener("submit", registerUser);
  }
}

async function registerUser(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  if (data.bio.trim() === "") {
    delete data.bio;
  }

  if (data.avatarUrl.trim() === "") {
    delete data.avatarUrl;
  } else {
    data.avatar = {
      url: data.avatarUrl,
      alt: `${data.name}'s avatar`,
    };
    delete data.avatarUrl;
  }

  try {
    await register(data);
    window.location.href = "./login.html";
  } catch (error) {
    errorHandler(".message", error.message);
  }
}
