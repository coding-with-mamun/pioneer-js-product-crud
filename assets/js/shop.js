function updateValueDisplay(range) {
  const valueDisplay = document.getElementById("rangeValue");
  const maxRange = parseInt(range.max, 10); // Get the maximum value of the range input
  const percentage = (range.value / maxRange) * 100; // Calculate the percentage position
  valueDisplay.textContent = range.value;

  // Ensure the value display stays within the bounds of the range input
  const parentWidth = range.offsetWidth;
  const valueWidth = valueDisplay.offsetWidth;
  const leftPosition = Math.min(
    Math.max((percentage / 100) * parentWidth - valueWidth / 2, 0),
    parentWidth - valueWidth
  );

  valueDisplay.style.left = `${leftPosition}px`;
}

// Initialize the value display on page load
window.addEventListener("DOMContentLoaded", (event) => {
  const rangeInput = document.getElementById("Range1");
  const resetButton = document.querySelector("button[type='reset']");

  updateValueDisplay(rangeInput);

  rangeInput.addEventListener("input", () => updateValueDisplay(rangeInput));

  resetButton.addEventListener("click", () => {
    // Wait for the reset event to update the input value
    setTimeout(() => {
      updateValueDisplay(rangeInput);
    }, 0);
  });
});
