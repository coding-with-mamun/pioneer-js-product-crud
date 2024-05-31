// get elements
const closeMsg = document.querySelector(".close-msg");

// Function to generate a unique ID
const generateUniqueId = () => "_" + Math.random().toString(36).substr(2, 9);

// Function to get the current date in ISO format
const getCurrentDate = () => new Date().toISOString();

// Function to show a message to the user
const showMessage = (message) => {
  const msgContainer = document.querySelector(".msg");
  const msgContent = msgContainer.querySelector("p");
  msgContent.textContent = message;
  msgContainer.style.display = "flex";
};

// Function to hide the message
const hideMessage = () => {
  const msgContainer = document.querySelector(".msg");
  msgContainer.style.display = "none";
};

// Attach event listener to the close button
if (closeMsg) {
  closeMsg.addEventListener("click", hideMessage);
}

// Function to extract form data
const extractFormData = (formElement) => {
  const formData = new FormData(formElement);
  return Object.fromEntries(formData.entries());
};
