export function errorHandler(container, message) {
  const parrent = document.querySelector(container);
  parrent.innerHTML = `<div class="message">${message}</div>`;
}
