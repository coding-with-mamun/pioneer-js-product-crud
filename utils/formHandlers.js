// Get all items from localStorage
const getItems = (key) => JSON.parse(localStorage.getItem(key)) || [];

// Create a new item in localStorage
const createItem = (key, data, e) => {
  // get all product
  const getAllProductUpdate = getItems("allproducts");

  // find single product
  const findSingleProduct = getAllProductUpdate.find(
    (item) => item.id == data.productId
  );

  if (findSingleProduct.quantity < data.quantity) {
    return alert("You select more data than available");
  } else {
    // Update product quantity
    findSingleProduct.quantity -= data.quantity;

    // Update the product in the localStorage
    const updatedProducts = getAllProductUpdate.map((item) =>
      item.id === findSingleProduct.id ? findSingleProduct : item
    );
    localStorage.setItem("allproducts", JSON.stringify(updatedProducts));
  }

  const items = JSON.parse(localStorage.getItem(key)) || [];
  const newItem = {
    ...data,
    id: generateUniqueId(),
    createdAt: getCurrentTimestamp(),
    updatedAt: getCurrentTimestamp(),
  };
  items.push(newItem);
  localStorage.setItem(key, JSON.stringify(items));
  e.target.reset();
  return newItem;
};
