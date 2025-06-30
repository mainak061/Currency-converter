document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

    const dropdowns = document.querySelectorAll(".dropdown select");

    const btn = document.querySelector("form button");

    const fromCurr = document.querySelector(".from select");

    const toCurr = document.querySelector(".to select");

    for (let select of dropdowns) {
        for (currCode in countryList) {
            let newOption = document.createElement("option");
            newOption.innerText = currCode;
            newOption.value = currCode;
            select.append(newOption);
            if (select.name === "from") select.value = "USD";
            if (select.name === "to") select.value = "INR";
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

    btn.addEventListener("click", async(evt) => {
        evt.preventDefault();
        let amount = document.querySelector(".amount input");
        let amountVal = amount.value;
        if (amountVal === "" || amountVal < 1) {
            amountVal = 1;
            amount.value = "1";
        }
        console.log(fromCurr.value, toCurr.value);
        const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
        // console.log(URL);
        let response= await fetch(URL);
        console.log(response);
    });
});
