const translationChoices = document.querySelectorAll('input[name="translation-choice"]');
const reflectionBox = document.getElementById('choice-reflection');
const selectedChoice = document.getElementById('selected-choice');

translationChoices.forEach((choice) => {
  choice.addEventListener('change', () => {
    selectedChoice.textContent = choice.dataset.label;
    reflectionBox.hidden = false;
  });
});
