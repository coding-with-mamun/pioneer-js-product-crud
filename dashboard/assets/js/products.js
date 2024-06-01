// get elements
const listProduct = document.querySelector(".listProduct");
const quantityField = document.getElementById("quantity");
const productIdField = document.getElementById("productId");
const closeQuantityModal = document.getElementById("closeQuantityModal");
const updateQuantityFormSubmit = document.getElementById(
  "updateQuantityFormSubmit"
);

const showAllProductList = () => {
  // Get all items from localStorage
  const getProduct = JSON.parse(localStorage.getItem("allproducts")) || [];

  // Filter out items with trash: true
  const filteredProducts = getProduct.filter((product) => !product.trash);

  // Sort items first by quantity (ascending), then by createdAt in descending order
  const sortedProducts = filteredProducts.sort((a, b) => {
    // If quantities are different, sort by quantity
    if (a.quantity !== b.quantity) {
      return a.quantity - b.quantity;
    }
    // If quantities are same, sort by createdAt
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  let getProductInfo = "";

  if (sortedProducts.length === 0) {
    getProductInfo = "<p>No Product Found</p>";
  } else {
    // Iterate over the sorted products and generate HTML
    sortedProducts.forEach((product) => {
      getProductInfo += `
        <tr class="align-middle">
          <td>${product?.productName || ""}</td>
          <td>${product?.sku || ""}</td>
          <td>${product?.brand || ""}</td>
          <td>${product?.regularPrice || ""}</td>
          <td>${product?.sellPrice || "" ? product?.sellPrice || "" : ""}</td>
          <td>
            ${
              product.quantity >= 10
                ? product?.quantity || ""
                : `<button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#quantityUpdateModal" onclick = "updateProductQuantity('${product.id}')">Add Quantity</button>`
            }
          </td>
          <td>${timeAgo(product.createdAt)}</td>
          <td>
            <button class="btn btn-info">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="btn btn-danger">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
    });
  }

  // Set the generated HTML to the product section wrapper
  listProduct.innerHTML = getProductInfo;
};

showAllProductList();

// update
const updateProductQuantity = (id) => {
  // Get all items from localStorage
  const getProduct = JSON.parse(localStorage.getItem("allproducts")) || [];

  // Filter out items with trash: true
  const findProducts = getProduct.find((product) => product.id == id);

  quantityField.value = findProducts.quantity;
  productIdField.value = findProducts.id;
};

updateQuantityFormSubmit.onsubmit = (e) => {
  updateData(e, "allproducts");
  showAllProductList();
  closeQuantityModal.click();
};
