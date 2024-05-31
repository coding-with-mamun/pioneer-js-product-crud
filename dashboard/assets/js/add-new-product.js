// get elements
const categoriesContainer = document.getElementById("categories-container");
const brandsContainer = document.getElementById("brands-container");

const newProductCreate = document.getElementById("newProductCreate");

const productNameInput = document.getElementById("productName");
const productSlugInput = document.getElementById("productSlug");

// Initialize the image preview functionality
setupImagePreview("productImage", "previewImage", "previewImageUrl");

const populateCategories = () => {
  categoriesContainer.innerHTML = "";

  // Retrieve category data from localStorage
  const categoryData = JSON.parse(localStorage.getItem("categoryData")) || [];

  // Loop through the data and create checkboxes
  categoryData.reverse().forEach(({ id, categoryName }) => {
    const checkbox = `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="${categoryName}" id="category${id}" />
          <label class="form-check-label" for="category${id}">${categoryName}</label>
        </div>`;
    categoriesContainer.insertAdjacentHTML("beforeend", checkbox);
  });
};

populateCategories();

const populateBrands = () => {
  brandsContainer.innerHTML = "";

  // Retrieve brand data from localStorage
  const brandsData = JSON.parse(localStorage.getItem("brandData")) || [];

  // Loop through the data and create radio buttons
  brandsData.reverse().forEach(({ id, brandName }) => {
    const brandRadio = `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="brandRadio" id="brandRadio${id}" value="${brandName}">
        <label class="form-check-label" for="brandRadio${id}">
          ${brandName}
        </label>
      </div>
    `;
    brandsContainer.insertAdjacentHTML("beforeend", brandRadio);
  });
};

populateBrands();

// generate slug dynamically
productNameInput.addEventListener("input", (event) => {
  const productName = event.target.value;
  const productSlug = generateSlug(productName);
  productSlugInput.value = productSlug;
});

// Call to createData on form submission
newProductCreate.addEventListener("submit", (event) => {
  event.preventDefault();
  createData("allproducts", newProductCreate, "productImage");
});
