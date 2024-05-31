// get elements
const productSectionWraper = document.querySelector(".product_section_wraper");

const showProductList = document.getElementById("showProductList");
const productHiddenId = document.getElementById("productHiddenId");
const buyNewProductSubmit = document.getElementById("buyNewProduct");
const productCategoryList = document.querySelector(".product_category_list");
const showSingleProductDetails = document.querySelector(
  ".showSingleProductDetails"
);

// Function to update the value display and position
const updateValueDisplay = (range) => {
  const valueDisplay = document.getElementById("rangeValue");
  const maxRange = parseInt(range.max, 10);
  const percentage = (range.value / maxRange) * 100;
  valueDisplay.innerText = range.value;

  const parentWidth = range.offsetWidth;
  const valueWidth = valueDisplay.offsetWidth;
  const leftPosition = Math.min(
    Math.max((percentage / 100) * parentWidth - valueWidth / 2, 0),
    parentWidth - valueWidth
  );

  valueDisplay.style.left = `${leftPosition}px`;
};

// Function to show all products or filtered products
const showProducts = (filterQuantity) => {
  const getProduct = JSON.parse(localStorage.getItem("allproducts")) || [];

  const filteredProducts = getProduct.filter(
    (product) => !product.trash && product.quantity <= filterQuantity
  );

  const sortedProducts = filteredProducts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  let getProductInfo = "";

  if (sortedProducts.length === 0) {
    getProductInfo = "<p>No Product Found</p>";
  } else {
    sortedProducts.forEach((product) => {
      getProductInfo += `
                    <div class="product_item_wraper">
                      <div class="product_top_bar_info">
                        <div class="product_status">
                        ${
                          product.quantity > 0
                            ? "<button>Stock</button>"
                            : "<button class='outOfStockBtn'>Out Of Stock</button>"
                        }
                          ${product.futured ? "<button>Featured</button>" : ""}
                        </div>
                        <div class="product_image">
                          <a class="" href="/shop/${product.productSlug}">
                            <img
                              src="${
                                product.productImage ||
                                "https://ninetheme.com/themes/electron/wp-content/uploads/2023/08/1-18-300x225.png"
                              }"
                              alt="${product.productName}"
                            />
                          </a>
                        </div>
                        <div class="single_product_future">
                          <span
                            data-bs-toggle="modal"
                            data-bs-target="#showSingleProduct"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Quick View"
                            onclick="showProductDetails('${product.id}')"
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              stroke-width="0"
                              viewBox="0 0 576 512"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                              ></path>
                            </svg>
                          </span>
                          <span
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Add to wishlist"
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              stroke-width="0"
                              viewBox="0 0 512 512"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div class="product_info">
                        <a class="" href="/shop/${product.productSlug}">
                          <h3 class="product_title">${product.productName}</h3>
                        </a>
                        <div class="product_pricing">
                          <span class="sale_price">৳${
                            product.sellPrice || product.regularPrice
                          }</span>
                          ${
                            product.sellPrice
                              ? `<span class="regular_price">৳${product.regularPrice}</span>`
                              : ""
                          }
                        </div>
                        ${
                          product.quantity > 0
                            ? `<p class='stock'>IN STOCK: ${product.quantity}</p>`
                            : `<p class='outOfStock'>OUT OF STOCK: ${product.quantity}</p>`
                        }
                        <div class="short_desc">
                          <p>${product.shortDescription}</p>
                        </div>
                        ${
                          product.quantity > 0
                            ? `<button class="add_to_card" data-bs-toggle="modal" data-bs-target="#bookProductCustomer" onclick="buyProduct('${product.id}')">Book Now</button>`
                            : `<button class="add_to_card_out_of_stock">OUT OF STOCK</button>`
                        }
                      </div>
                    </div>
                  `;
    });
  }

  productSectionWraper.innerHTML = getProductInfo;
};

// Event listener for DOM content loaded
window.addEventListener("DOMContentLoaded", (event) => {
  const rangeInput = document.getElementById("Range1");
  const maxValueSpan = document.getElementById("maxValue");
  const resetButton = document.querySelector("button[type='reset']");

  const allproducts = JSON.parse(localStorage.getItem("allproducts")) || [];
  const maxQuantity = allproducts.reduce((max, product) => {
    const quantity = parseInt(product.quantity);
    return isNaN(quantity) ? max : Math.max(max, quantity);
  }, 0);

  rangeInput.max = maxQuantity;
  maxValueSpan.innerText = maxQuantity;

  updateValueDisplay(rangeInput);
  showProducts(maxQuantity);

  rangeInput.addEventListener("input", () => {
    updateValueDisplay(rangeInput);
    showProducts(rangeInput.value);
  });

  resetButton.addEventListener("click", () => {
    setTimeout(() => {
      rangeInput.value = 0;
      updateValueDisplay(rangeInput);
      showProducts(maxQuantity);
    }, 0);
  });
});

// get products

const showAllProductList = () => {
  // Get all items from localStorage
  const getProduct = getItems("allproducts");

  // Filter out items with trash: true
  const filteredProducts = getProduct.filter((product) => !product.trash);

  // Sort items by createdAt in descending order
  const sortedProducts = filteredProducts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  let getProductInfo = "";

  if (sortedProducts.length === 0) {
    getProductInfo = "<p>No Product Found</p>";
  } else {
    // Iterate over the sorted products and generate HTML
    sortedProducts.forEach((product) => {
      getProductInfo += `
        <div class="product_item_wraper">
          <div class="product_top_bar_info">
            <!-- Product Status Labels -->
            <div class="product_status">
            ${
              product.quantity > 0
                ? "<button>Stock</button>"
                : "<button class= 'outOfStockBtn'>Out Of Stock</button>"
            }
              ${product.futured ? "<button>Featured</button>" : ""}
            </div>
            <!-- Product Image -->
            <div class="product_image">
              <a class="" href="/shop/${product.productSlug}">
                <img
                  src="${
                    product.productImage ||
                    "https://ninetheme.com/themes/electron/wp-content/uploads/2023/08/1-18-300x225.png"
                  }"
                  alt="${product.productName}"
                />
              </a>
            </div>
            <!-- Product Quick Actions -->
            <div class="single_product_future">
              <span
                data-bs-toggle="modal"
                data-bs-target="#showSingleProduct"
                data-toggle="tooltip"
                data-placement="top"
                title="Quick View"
                onclick = "showProductDetails('${product.id}')"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 576 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                  ></path>
                </svg>
              </span>
              <span
                data-toggle="tooltip"
                data-placement="top"
                title="Add to wishlist"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <!-- Product Information -->
          <div class="product_info">
            <a class="" href="/shop/${product.productSlug}">
              <h3 class="product_title">${product.productName}</h3>
            </a>
            <!-- Product Pricing -->
            <div class="product_pricing">
              <span class="sale_price">৳${
                product.sellPrice || product.regularPrice
              }</span>
              
              ${
                product.sellPrice
                  ? `<span class="regular_price">৳${product.regularPrice}</span>`
                  : ""
              }
            </div>
            ${
              product.quantity > 0
                ? `<p class='stock'>IN STOCK: ${product.quantity}</p>`
                : `<p class='outOfStock'>OUT OF STOCK: ${product.quantity}</p>`
            }
            <!-- Short Description -->
            <div class="short_desc">
              <p>${product.shortDescription}</p>
            </div>
            <!-- Add to Cart Button -->
            ${
              product.quantity > 0
                ? `<button class="add_to_card" data-bs-toggle="modal" data-bs-target="#bookProductCustomer" onclick = "buyProduct('${product.id}')">Book Now</button>`
                : `<button class="add_to_card_out_of_stock">OUT OF STOCK</button>`
            }
          </div>
        </div>
      `;
    });
  }

  // Set the generated HTML to the product section wrapper
  productSectionWraper.innerHTML = getProductInfo;
};

// get all category

const showAllCategory = () => {
  // Get all items from localStorage
  const getCategory = getItems("categoryData");

  // Filter out items with trash: true
  const filteredCategories = getCategory.filter((category) => !category.trash);

  // Sort items by createdAt in descending order
  const sortedCategory = filteredCategories.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  let getAllCategory = "";

  if (sortedCategory.length === 0) {
    getProductInfo = "<p>No Categories Found</p>";
  } else {
    sortedCategory.map((item) => {
      getAllCategory += ` <a class="product_category_item" href="/category/test-category">
      <b>0</b>
      <img
        src="${item.categoryImage}"
        alt=""
      />
      <h5>${item.categoryName}</h5>
    </a>`;
    });
  }

  productCategoryList.innerHTML = getAllCategory;
};

//
const showProductDetails = (id) => {
  // Get all items from localStorage
  const getAllProduct = getItems("allproducts");

  // Filter out items with trash: true
  const findSingleProduct = getAllProduct.find((product) => product.id == id);

  // category HTML string
  let categoryHTML = "";

  // Iterate over the categories array and generate anchor elements
  findSingleProduct.categories.forEach((category, index) => {
    // Add a comma after each category except the last one
    if (index < findSingleProduct.categories.length - 1) {
      categoryHTML += `<a href="/category/${category}">${category}</a>, `;
    } else {
      categoryHTML += `<a href="/category/${category}">${category}</a>`;
    }
  });

  // singleProductData
  showSingleProductDetails.innerHTML = `
  <div class="row">
  <div class="col-md-5">
    <div class="single_view_photo">
      <img
        src="${findSingleProduct.productImage}"
        alt=""
      />
    </div>
  </div>
  <div class="col-md-7">
    <div class="single_view_detels">
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
      <h3>${findSingleProduct.productName}</h3>
      <div class="single_view_priging">
    
        <div class="single_sale_price"><h4>৳${
          findSingleProduct.sellPrice || findSingleProduct.regularPrice
        }</h4></div>
        ${
          findSingleProduct.sellPrice
            ? `<div class="single_reguler_price"><h4>৳${findSingleProduct.regularPrice}</h4></div>`
            : ""
        }

        
      </div>
      <div class="product_sort_view_desc">
        <p>${findSingleProduct.description}</p>
      </div>
      <div class="single_product_cart_info">
        <div class="single_cart_btns">
        ${
          findSingleProduct.quantity > 0
            ? `
          <button  data-bs-toggle="modal" data-bs-target="#bookProductCustomer" onclick = "buyProduct('${findSingleProduct.id}')">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 576 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994-29.823-.429-54.35-24.631-55.155-54.447-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938-28.54-1.325-51.751-24.385-53.251-52.917-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320zM408 168h-48v-40c0-8.837-7.163-16-16-16h-16c-8.837 0-16 7.163-16 16v40h-48c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h48v40c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-40h48c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16z"
              ></path></svg> Add to cart</button> `
            : `<button class="add_to_card_out_of_stock">OUT OF STOCK</button>`
        }
          <button class="wishlist_button">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
              ></path>
            </svg>
            Add to wishlist
          </button>
        </div>
        <div class="product_additional_info">
          <div class="category">
            <b>Category:</b>
            ${categoryHTML}
          </div>
          <div class="brand">
            <b>Brand:</b>
            <span>${findSingleProduct.brand}</span>
          </div>
          <div class="sku">
            <b>SKU:</b>
            <span>${findSingleProduct.sku}</span>
          </div>

          <div class="share">
            <b>Stock:</b>
            <span>${findSingleProduct.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  
  
  
  
  
  `;
};

// buy product
const buyProduct = (id) => {
  productHiddenId.value = id;
  // Get all items from localStorage
  const getProduct = getItems("allproducts");

  // Filter out items with trash: true
  const filteredProducts = getProduct.filter((product) => !product.trash);
  const singleItem = getProduct.find((singleItem) => singleItem.id == id);

  // Sort items by createdAt in descending order
  const sortedProducts = filteredProducts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  let selectInputName = "";

  sortedProducts.map((item) => {
    selectInputName += `<option ${
      singleItem.productName === item.productName || singleItem.id === item.id
        ? "selected"
        : ""
    } value="${item.productName}">${item.productName}</option>`;
  });

  showProductList.innerHTML = selectInputName;
};

// buy product
buyNewProductSubmit.onsubmit = (e) => {
  e.preventDefault();
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());
  createItem("customer", data, e);

  showAllProductList();
};

// Call the function to display the products
showAllProductList();
showAllCategory();
