const bigGlass = document.querySelector('.glass--big');

const glasses = document.querySelectorAll('.glass--small');

for (let i = 0; i < glasses.length; i++) {
  glasses[i].setAttribute('data-id', i + 1);
}
function removeGlass(glass) {
  glass.classList.remove('active');
}
function clearAll() {
  glasses.forEach((glass) => {
    removeGlass(glass);
  });
}

function fillGlass(glass) {
  glass.classList.add('active');
}

function waterHaveTaken() {
  // Check current glass have taken
  const glassesTaken = document.querySelectorAll('.active');

  // sum of water
  let amountWater = 0;
  glassesTaken.forEach((glass) => {
    amountWater += 250;
  });

  return amountWater;
}

function waterInPercentage(amountWater) {
  // Take the goal of bigGlass
  const goal = bigGlass.dataset.target;
  return (amountWater * 100) / goal;
}

function heightInPixel(percentage, height) {
  return (pixel = (percentage / 100) * height);
}

function fillUpRemain() {
  // Percentage of Water have taken
  const amountWater = waterHaveTaken();
  const waterPercentage = waterInPercentage(amountWater);
  // Fill up
  // Get the height of the bigGlass
  const heightBigGlass = bigGlass.getBoundingClientRect().height;

  const fillEle = document.querySelector('.fill');

  const waterPixel = heightInPixel(waterPercentage, heightBigGlass);

  // Change the water taken in css variable
  document
    .querySelector('.glass--big')
    .style.setProperty('--water-taken', `${waterPixel}px`);

  // Put the remain amount to the glass
  putRemainIntoTheGlass();

  // Put the percentage to water
  fillEle.innerHTML = `${waterPercentage}%`;
}

function convertToLiter(amount) {
  return amount / 1000;
}

function calculateRemain() {
  // Take the remain
  let remain = +document.querySelector('.remain').dataset.remain;
  let amountWater = waterHaveTaken();

  remain -= amountWater;
  remain = convertToLiter(remain);
  return remain;
}

function putRemainIntoTheGlass() {
  let remainEle = document.querySelector('.remain');

  let remainAmount = calculateRemain();
  remainEle.innerHTML = `${remainAmount}L`;
}

let currentLength = 0;
glasses.forEach((glass) => {
  glass.addEventListener('click', (e) => {
    const glassId = +e.currentTarget.getAttribute('data-id');

    // Remove active if it have fill and it is the last active
    if (currentLength === glassId) {
      removeGlass(glass);
      currentLength--;
    } else {
      currentLength = glassId;
      // Clear All before fill again
      clearAll();
      // Fill up the small glass
      for (let i = 0; i < currentLength; i++) {
        fillGlass(glasses[i]);
      }
    }

    // Fill up the big glass after click the small glass
    fillUpRemain();
  });
});

// Event: Show remain
