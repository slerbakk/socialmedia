import { getPosts } from "../posts/getPosts.js";

// Function to create a button with event listener
function createPageButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

// Function to update pagination buttons
export function updatePagination(meta) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = ""; // Clear any existing pagination

  if (!meta || !meta.pageCount) {
    console.log("No pagination info available");
    return;
  }

  const { pageCount, currentPage, previousPage, nextPage } = meta;
  const maxPageButtons = 10;

  // Function to create and append buttons
  const appendButton = (text, onClick) =>
    paginationContainer.appendChild(createPageButton(text, onClick));

  // Create "Previous" button if applicable
  if (previousPage) appendButton("Previous", () => getPosts(previousPage));

  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(pageCount, startPage + maxPageButtons - 1);

  if (endPage - startPage < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  // First page button and ellipsis if necessary
  if (startPage > 1) {
    appendButton("1", () => getPosts(1));

    if (startPage > 2) {
      appendButton("...", () => {}); // Ellipsis, no action
    }
  }

  // Loop through the pages to create page buttons
  for (let i = startPage; i <= endPage; i++) {
    const pageButton = createPageButton(i, () => getPosts(i));
    if (i === currentPage) pageButton.classList.add("active");
    paginationContainer.appendChild(pageButton);
  }

  // Last page button and ellipsis if necessary
  if (endPage < pageCount) {
    if (endPage < pageCount - 1) {
      appendButton("...", () => {}); // Ellipsis, no action
    }
    appendButton(pageCount, () => getPosts(pageCount));
  }

  // Create "Next" button if applicable
  if (nextPage) appendButton("Next", () => getPosts(nextPage));
}
