document.addEventListener("DOMContentLoaded", () => {
    const baseURL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";

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
        let amount = document.querySelector(".amount input");
        let amountVal = amount.value;
        if (amountVal === "" || amountVal < 1) {
            amountVal = 1;
            amount.value = "1";
        }
        console.log(fromCurr.value, toCurr.value);
        const URL=`${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
        console.log(URL);
    //     let response= await fetch(URL);
    //     console.log(response);
    });
});
