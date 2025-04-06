import { baseUrl, postsUrl, API_KEY } from "../constants/api.js";

export async function createPost(postData) {
  const url = `${baseUrl}${postsUrl}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify(postData),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
}
