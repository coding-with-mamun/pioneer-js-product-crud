document.addEventListener("DOMContentLoaded", function () {
  var submenuToggles = document.querySelectorAll(".submenu-toggle");

  submenuToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      var parentLi = this.parentElement;

      // Remove the .open class from all .has-submenu elements
      document.querySelectorAll(".has-submenu.open").forEach(function (li) {
        li.classList.remove("open");
      });

      // Toggle the .open class on the clicked element
      parentLi.classList.toggle("open");
    });
  });
});
// Script File
var hamburgerBtn = document.querySelector(".hamburger-btn");
var sideBar = document.querySelector(".side-bar");

hamburgerBtn.addEventListener("click", sidebarToggle);
function sidebarToggle() {
  sideBar.classList.toggle("active");
}

// Code For Light/Dark Mode Toggle
var modeSwitcher = document.querySelector(".mode-switch i");
var body = document.querySelector("body");
modeSwitcher.addEventListener("click", modeSwitch);
function modeSwitch() {
  body.classList.toggle("active");
}
