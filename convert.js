let selects = document.querySelectorAll(".select-container select"); 
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
const but= document.querySelector("button");
const amount = document.querySelector(".amount input");
let ms=document.querySelector(".msg");

let updateExchangeRate = () =>
{
   // let amount = document.querySelector(".amount input");
    var amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    console.log(amtVal);

}


for(let drop of selects)
{
for(let x in countryList)
{
    let el = document.createElement("option");
    el.textContent = x;
    el.value =x;
   drop.appendChild(el)
}
console.dir(drop);
drop.addEventListener("change",() =>
{
  
    let currCode = drop.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = drop.parentElement.querySelector("img");
    img.src = newSrc;
});
}
function calrate()
{
fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`)
.then(response => response.json())
.then(data => {
  const conversionRate = data.rates[toCurr.value];
  console.log(conversionRate);
  ms.innerHTML=`${amount.value} ${fromCurr.value} equals ${conversionRate * amount.value} ${toCurr.value}`;
  console.log(`${amount.value} ${fromCurr.value} equals ${conversionRate * amount.value} ${toCurr.value}`);
})
.catch(error => console.error('Error fetching conversion data:', error));
}

but.addEventListener("click",(event) =>{
event.preventDefault();
calrate();
});


window.addEventListener("load", () => {
    updateExchangeRate();
    fromCurr.value="USD";
    toCurr.value="INR";
    calrate();
  });
