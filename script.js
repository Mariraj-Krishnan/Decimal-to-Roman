const swapButton = document.querySelector(".swap-button");
const input = document.querySelector(".input");
const equalButton = document.querySelector(".equal-button");
const result = document.querySelector(".result");
const container = document.querySelector(".container");
const err = document.querySelector(".err");
const refreshButton = document.querySelector(".refresh-button");
let swapped = false;
input.value = "";
const romanToIntRef = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};
const intToRomanRef = [
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
  [1, "I"],
];
swapButton.onclick = () => {
  input.value = "";
  if (!swapped) {
    input.placeholder = "Enter the decimal number";
    result.querySelector("span").textContent = "Roman:";
    swapped = true;
  } else {
    input.placeholder = "Enter the roman number";
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
  } else {
    swapButton.style.display = "none";
    equalButton.style.display = "block";
  }
};

equalButton.onclick = function () {
  if (!input.value) return;
  //decimal to roman
  if (swapped) {
    let enteredNumber = parseInt(input.value);
    let found = intToRoman(enteredNumber);
    this.style.display = "none";
    refreshButton.style.display = "block";
    result.querySelector(".ans").textContent = found;
  }
  //roman to decimal
  if (!swapped) {
    let enteredRoman = input.value.replace(/ /g, "");
    if (!enteredRoman) return;

    if (
      enteredRoman.match(
        /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
      ) == null
    ) {
      err.style.display = "initial";
      return;
    }

    let decimal = romanToInt(enteredRoman);
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

var romanToInt = function (romanString) {
  let result = 0;
  for (let i = 0; i < romanString.length; i++) {
    if (i < romanString.length - 1) {
      if (
        (romanString[i] == "I" &&
          (romanString[i + 1] == "V" || romanString[i + 1] == "X")) ||
        (romanString[i] == "X" &&
          (romanString[i + 1] == "L" || romanString[i + 1] == "C")) ||
        (romanString[i] == "C" &&
          (romanString[i + 1] == "D" || romanString[i + 1] == "M"))
      ) {
        result +=
          romanToIntRef[romanString[i + 1]] - romanToIntRef[romanString[i]];
        i++;
        continue;
      }
    }
    result += romanToIntRef[romanString[i]];
  }
  return result;
};

var intToRoman = function (integerNum) {
  let result = "";
  while (integerNum > 0) {
    for (let i = 0; i < intToRomanRef.length; i++) {
      if (integerNum / intToRomanRef[i][0] >= 1) {
        result += intToRomanRef[i][1];
        integerNum -= intToRomanRef[i][0];
        break;
      }
    }
  }
  return result;
};
