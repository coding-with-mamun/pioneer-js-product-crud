// Function to setup image preview and save the image URL to localStorage
const setupImagePreview = (fileInputId, previewImageId, localStorageKey) => {
  const fileInput = document.getElementById(fileInputId);
  const previewImage = document.getElementById(previewImageId);

  fileInput.addEventListener("change", (event) => {
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target.result;

        // Set the preview image source to the selected file
        previewImage.src = imageUrl;
        previewImage.style.display = "block";

        // Store the image URL in localStorage
        localStorage.setItem(localStorageKey, imageUrl);
      };

      reader.readAsDataURL(file);
    } else {
      // Hide the preview image if no file is selected
      previewImage.src = "";
      previewImage.style.display = "none";

      // Remove the image URL from localStorage
      localStorage.removeItem(localStorageKey);
    }
  });

  // On page load, check if there is an image URL in localStorage
  document.addEventListener("DOMContentLoaded", () => {
    const storedImageUrl = localStorage.getItem(localStorageKey);

    if (storedImageUrl) {
      // Set the preview image source to the stored URL
      previewImage.src = storedImageUrl;
      previewImage.style.display = "block";
    } else {
      // Hide the preview image if no URL is stored
      previewImage.style.display = "none";
    }
  });
};

// Function to generate slug from category name
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
};

window.addEventListener("beforeunload", function (event) {
  // Remove item from localStorage when the page reload
  localStorage.removeItem("previewImageUrl");
});

/**
 *
 * @param {*} timestamp
 * @returns
 */
const timeAgo = (timestamp) => {
  const date = new Date(timestamp);
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};
