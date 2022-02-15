const swapButton = document.querySelector(".swap-button"),
      input = document.querySelector(".input"),
      equalButton = document.querySelector(".equal-button"),
      result = document.querySelector(".result"),
      container = document.querySelector(".container"),
      err = document.querySelector(".err"),
      refreshButton = document.querySelector(".refresh-button");
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
    If(enteredNumber > 1000) return;
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
    let enteredRoman = input.value.replace(/ /g, ""),
        computed = [],
        repeatedTimes = [];
    if (!enteredRoman) return;
    numbers.forEach((num) => {
      let times = 0;
      const regEx = new RegExp(num[1], "g"),
            regExpRepeat = new RegExp(
        `${num[1]}${num[1]}${num[1]}${num[1]}`,
        "g"
      );
      if (enteredRoman.startsWith(num[1])) {
        if (
          enteredRoman.match(regExpRepeat) ||
          (enteredRoman.match(regEx).length > 1 &&
            num[0] != 1 &&
            num[0] != 10 &&
            num[0] != 100 &&
            num[0] != 1000)
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
