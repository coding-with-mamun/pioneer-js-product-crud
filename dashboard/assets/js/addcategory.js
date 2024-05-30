// Get required elements
const categoryFormElement = document.getElementById("categoryForm");
const categoryNameInput = document.getElementById("categoryName");
const categorySlugInput = document.getElementById("categorySlug");

// Initialize the image preview functionality
setupImagePreview("categoryImage", "previewImage", "previewImageUrl");

// Add event listener to the category name input to generate slug dynamically
categoryNameInput.addEventListener("input", (event) => {
  const categoryName = event.target.value;
  const categorySlug = generateSlug(categoryName);
  categorySlugInput.value = categorySlug;
});

// Add event listener to the submit button
categoryFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  createData("categoryData", categoryFormElement, "categoryImage");
});
