const listCategories = document.querySelector(".listCategories");

const showBrandItem = () => {
  // Get all items from localStorage
  const getCategories = JSON.parse(localStorage.getItem("categoryData")) || [];

  // Filter out items with trash: true
  const filteredCategories = getCategories.filter(
    (categories) => !categories.trash
  );

  let categoriesItemHtml = "";

  filteredCategories.reverse().forEach((item, index) => {
    categoriesItemHtml += `
    <tr class="align-middle">
    <td>${index + 1}</td>
    <td>${item.categoryName}</td>
    <td class="productDashImage">
    ${item.categoryImage ? `<img src='${item.categoryImage}' alt='' />` : ""}
      
    </td>
    <td> ${item.categoryDesc}</td>
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

  listCategories.innerHTML = categoriesItemHtml;
};
showBrandItem();
