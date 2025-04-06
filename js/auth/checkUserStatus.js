export function checkUserStatus() {
  const token = localStorage.getItem("LoginToken");
  const user = localStorage.getItem("user");

  // Return true if both token and user are present
  return token && user;
}
