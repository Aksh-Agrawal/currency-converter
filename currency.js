const BASE_URL = "https://api.frankfurter.app/latest?";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const output = document.querySelector(".msg");

for (let select of dropdown) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async () => {
  let amount = document.querySelector(".amount input ");
  let amtVal = amount.value;
  const newUrl = `https://api.frankfurter.app/latest?${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;
  let respone = await fetch(newUrl);
  let data = await respone.json();
  let rate = data.rates[toCurr.value];
  let finalAmt = amount.value * rate;
  output.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
  console.log(finalAmt);

});
