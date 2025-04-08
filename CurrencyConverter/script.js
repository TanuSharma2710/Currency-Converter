const base_url="https://api.exchangerate-api.com/v4/latest";


const dropdowns = document.querySelectorAll(".container select");
const butn=document.querySelector("#butn1");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector("#msg1");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (currCode === "USD" && select.name === "from") {
            newOption.selected = "selected";
        }
        else if (currCode === "INR" && select.name === "to") {
            newOption.selected = "selected";
        }
        
        select.append(newOption);

        select.addEventListener( "change",(evt)=> {
        updateFlag(evt.target);

        });
    }
}

    const updateFlag=(element) => {
        let currCode=element.value;
        let countryCode=countryList[currCode];
        let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
        let img=element.parentElement.querySelector("img");
            img.src=newSrc;
        
    };

    butn.addEventListener( "click",async (evt) => {
        evt.preventDefault();
        let amount=document.querySelector("input");
        let amtValue=amount.value;
        if(amtValue=="" || amtValue<0){
            amtValue=1;
            amount.value="1";
        }
        console.log(fromCurr.value,toCurr.value);
        const URL = `${base_url}/${fromCurr.value}`;
        let response = await fetch(URL);
        let data = await response.json();
        

        let rate = data.rates[toCurr.value];
        let convertedAmount = (amtValue * rate).toFixed(2);
        console.log(`Converted amount: ${convertedAmount}`);
        msg.innerText=`${amtValue} ${fromCurr.value}= ${convertedAmount} ${toCurr.value}`;

    })


