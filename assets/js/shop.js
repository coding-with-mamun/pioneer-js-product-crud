const updateValueDisplay = (range) => {
  const valueDisplay = document.getElementById("rangeValue");
  const maxRange = parseInt(range.max, 10);
  const percentage = (range.value / maxRange) * 100;
  valueDisplay.textContent = range.value;

  const parentWidth = range.offsetWidth;
  const valueWidth = valueDisplay.offsetWidth;
  const leftPosition = Math.min(
    Math.max((percentage / 100) * parentWidth - valueWidth / 2, 0),
    parentWidth - valueWidth
  );

  valueDisplay.style.left = `${leftPosition}px`;
};

window.addEventListener("DOMContentLoaded", (event) => {
  const rangeInput = document.getElementById("Range1");
  const resetButton = document.querySelector("button[type='reset']");

  updateValueDisplay(rangeInput);

  rangeInput.addEventListener("input", () => updateValueDisplay(rangeInput));

  resetButton.addEventListener("click", () => {
    setTimeout(() => {
      updateValueDisplay(rangeInput);
    }, 0);
  });
});

// get products
