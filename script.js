const swapButton = document.querySelector(".swap-button");
const input = document.querySelector(".input");
const equalButton = document.querySelector(".equal-button");
const result = document.querySelector(".result");
const container = document.querySelector(".container");
const err = document.querySelector(".err");
const refreshButton = document.querySelector(".refresh-button");
let swapped = false;
input.value = "";
const numbers = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [3, "III"],
  [2, "II"],
  [1, "I"],
];
swapButton.onclick = () => {
  input.value = "";
  if (!swapped) {
    input.placeholder = "Enter decimal number";
    result.querySelector("span").textContent = "Roman:";
    swapped = true;
  } else {
    input.placeholder = "Enter roman number";
    result.querySelector("span").textContent = "Decimal:";
    swapped = false;
  }
};
input.oninput = function () {
  this.value = this.value.toUpperCase();
  result.querySelector(".ans").textContent = "--";
  err.style.display = "none";
  refreshButton.style.display = "none";
  if (!this.value) {
    swapButton.style.display = "block";
    equalButton.style.display = "none";
    refreshButton.style.display = "none";
  } else {
    swapButton.style.display = "none";
    equalButton.style.display = "block";
    refreshButton.style.display = "none";
  }
};
equalButton.onclick = function () {
  if (!input.value) return;
  //decimal to roman
  if (swapped) {
    let enteredNumber = parseInt(input.value);
    let found = "";
    numbers.forEach((num) => {
      if (!enteredNumber) return;
      do {
        if (Math.floor(enteredNumber / num[0]) > 0) {
          enteredNumber -= num[0];
          found += num[1];
        }
      } while (enteredNumber >= num[0]);
    });
    this.style.display = "none";
    refreshButton.style.display = "block";
    result.querySelector(".ans").textContent = found;
  }
  //roman to decimal
  if (!swapped) {
    let enteredRoman = input.value.replace(/ /g, "");
    let computed = [];
    let repeatedTimes = [];
    numbers.forEach((num) => {
      let times = 0;
      if (!enteredRoman) return;
      if (enteredRoman.startsWith(num[1])) {
        if (
          (enteredRoman.match(num[1]).length > 1 &&
          !enteredRoman.match(num[1]).length > 3)&&
          (num[0] != 10 || num[0] != 100 || num[0] != 1000)
        ) {
          err.style.display = "initial";
          return;
        }
        do {
          times++;
          computed.push(num[0]);
          enteredRoman = enteredRoman.replace(
            enteredRoman.slice(0, num[1].length),
            ""
          );
        } while (enteredRoman.startsWith(num[1]));
        repeatedTimes.push(times);
      }
    });
    if (enteredRoman) {
      err.style.display = "initial";
      return;
    }
    let decimal = 0;
    computed.forEach((num) => {
      decimal += num;
    });
    this.style.display = "none";
    refreshButton.style.display = "block";
    result.querySelector(".ans").textContent = decimal;
  }
};
refreshButton.onclick = function () {
  input.value = "";
  result.querySelector(".ans").textContent = "--";
  this.style.display = "none";
  swapButton.style.display = "block";
};
