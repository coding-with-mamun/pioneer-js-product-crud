const listBrand = document.querySelector(".listBrand");

const showBrandItem = () => {
  // Get all items from localStorage
  const getBrand = JSON.parse(localStorage.getItem("brandData")) || [];

  // Filter out items with trash: true
  const filteredBrands = getBrand.filter((brand) => !brand.trash);

  let barndItemHtml = "";

  filteredBrands.reverse().forEach((item, index) => {
    barndItemHtml += `
    <tr class="align-middle">
    <td>${index + 1}</td>
    <td>${item.brandName}</td>
    <td class="productDashImage">
    ${item.brandImage ? `<img src='${item.brandImage}' alt='' />` : ""}
      
    </td>
    <td> ${item.brandDesc}</td>
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

  listBrand.innerHTML = barndItemHtml;
};
showBrandItem();
