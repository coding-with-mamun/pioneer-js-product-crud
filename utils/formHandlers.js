// Create a new item in localStorage
const createItem = (key, data) => {
  const items = JSON.parse(localStorage.getItem(key)) || [];
  const newItem = {
    ...data,
    id: generateUniqueId(),
    createdAt: getCurrentTimestamp(),
    updatedAt: getCurrentTimestamp(),
  };
  items.push(newItem);
  localStorage.setItem(key, JSON.stringify(items));
  return newItem;
};

// Get all items from localStorage
const getItems = (key) => JSON.parse(localStorage.getItem(key)) || [];
