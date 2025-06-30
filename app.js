document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

    const dropdowns = document.querySelectorAll(".dropdown select");
    const btn = document.querySelector("form button");
    const fromCurr = document.querySelector(".from select");
    const toCurr = document.querySelector(".to select");
    const msg = document.querySelector(".msg");


    for (let select of dropdowns) {
        for (let currCode in countryList) {
            let newOption = document.createElement("option");
            newOption.innerText = currCode;
            newOption.value = currCode;
            select.append(newOption);
        }


        if (select.name === "from") select.value = "USD";
        if (select.name === "to") select.value = "INR";
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


    btn.addEventListener("click", async (evt) => {
        evt.preventDefault();

        let amountInput = document.querySelector(".amount input");
        let amountVal = parseFloat(amountInput.value);

        if (isNaN(amountVal) || amountVal < 1) {
            amountVal = 1;
            amountInput.value = "1";
        }

        const fromCode = fromCurr.value.toLowerCase();
        const toCode = toCurr.value.toLowerCase();
        const URL = `${baseUrl}/currencies/${fromCode}.json`;

        try {
            const response = await fetch(URL);
            const data = await response.json();
            const rate = data[fromCode][toCode];

            const total = (amountVal * rate).toFixed(2);
            msg.innerText = `${amountVal} ${fromCurr.value} = ${total} ${toCurr.value}`;
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
            msg.innerText = "Failed to fetch exchange rate. Try again.";
        }
    });
});