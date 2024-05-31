const listCustomerDashboard = document.querySelector(".listCustomerDashboard");

const showCustomerDashboard = () => {
  // Get all items from localStorage
  const getCustomer = JSON.parse(localStorage.getItem("customer")) || [];

  // Filter out items with trash: true
  const filteredCustomer = getCustomer.filter((brand) => !brand.trash);

  let customerItemHtml = "";

  filteredCustomer.reverse().forEach((item, index) => {
    customerItemHtml += `
    <tr class="align-middle">
    <td>${index + 1}</td>
    <td>${item.name}</td>
    <td> ${item.email}</td>
    <td> ${item.phone}</td>
    <td> ${item.address}</td>
    <td> ${item.product}</td>
    <td> ${item.quantity}</td>
    <td> ${item.productId}</td>
  </tr>
    
    `;
  });

  listCustomerDashboard.innerHTML = customerItemHtml;
};
showCustomerDashboard();
