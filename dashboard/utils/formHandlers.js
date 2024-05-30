// formHandlers.js

// Function to create data and save it to localStorage
const createData = (event, key, formElement) => {
  const data = extractFormData(formElement);

  // Retrieve the image URL from localStorage
  const imageUrl = localStorage.getItem("previewImageUrl");
  if (imageUrl) {
    data.categoryImage = imageUrl;
  }

  let storageData = JSON.parse(localStorage.getItem(key)) || [];

  const newData = {
    id: generateUniqueId(),
    trash: false,
    createdAt: getCurrentDate(),
    updatedAt: null,
    futured: false,
    ...data,
  };

  storageData.push(newData);
  localStorage.setItem(key, JSON.stringify(storageData));
  showMessage("Data created successfully!");

  // Reset the form and image preview
  formElement.reset();
  document.getElementById("previewImage").style.display = "none";
  document.getElementById("previewImage").src = "";
  localStorage.removeItem("previewImageUrl");
};

// Function to update data
const updateData = (event, key) => {
  event.preventDefault();
  const formElement = event.target;
  const data = extractFormData(formElement);
  const id = data.id;

  let storageData = JSON.parse(localStorage.getItem(key)) || [];
  let isUpdated = false;

  storageData = storageData.map((item) => {
    if (item.id === id) {
      isUpdated = true;
      return {
        ...item,
        ...data,
        updatedAt: getCurrentDate(),
      };
    }
    return item;
  });

  if (isUpdated) {
    localStorage.setItem(key, JSON.stringify(storageData));
    showMessage("Data updated successfully!");
  } else {
    showMessage("Data not found!");
  }
};

// Function to delete data
const deleteData = (event, key) => {
  event.preventDefault();
  const formElement = event.target;
  const data = extractFormData(formElement);
  const id = data.id;

  let storageData = JSON.parse(localStorage.getItem(key)) || [];
  const initialLength = storageData.length;

  storageData = storageData.filter((item) => item.id !== id);

  if (storageData.length < initialLength) {
    localStorage.setItem(key, JSON.stringify(storageData));
    showMessage("Data deleted successfully!");
  } else {
    showMessage("Data not found!");
  }
};

// Function to view a single item by id
const viewData = (event, key) => {
  event.preventDefault();
  const formElement = event.target;
  const data = extractFormData(formElement);
  const id = data.id;

  let storageData = JSON.parse(localStorage.getItem(key)) || [];
  const item = storageData.find((item) => item.id === id) || null;

  if (item) {
    showMessage(`Data found: ${JSON.stringify(item)}`);
  } else {
    showMessage("Data not found!");
  }

  return item;
};
