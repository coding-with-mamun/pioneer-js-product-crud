// Get required elements
const brandForm = document.getElementById("brandForm");
const brandNameInput = document.getElementById("brandName");
const brandSlugInput = document.getElementById("brandSlug");

// Initialize the image preview functionality
setupImagePreview("brandImage", "previewImage", "previewImageUrl");

// generate slug dynamically
brandNameInput.addEventListener("input", (event) => {
  const brandName = event.target.value;
  const brandSlug = generateSlug(brandName);
  brandSlugInput.value = brandSlug;
});

// Add event listener to the submit button
brandForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createData("brandData", brandForm, "brandImage");
});
