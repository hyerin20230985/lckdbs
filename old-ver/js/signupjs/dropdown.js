const emailList = document.getElementById("email-list");
const emailInput = document.getElementById("email-text");

const year = document.getElementById("birth-year");
const month = document.getElementById("birth-month");
const day = document.getElementById("birth-day");

emailList.addEventListener('change', (e) => {
    if (e.target.value !== "type"){
        emailInput.value = e.target.value;
        emailInput.disabled = true;
    } else {
        emailInput.value = "";
        emailInput.disabled = false;
    }
})

isYearOption = false;
year.addEventListener('focus', function() {
    if(!isYearOption){
        for(let i = 1940; i <= 2011; i++){
            const yearOption = document.createElement('option');
            yearOption.setAttribute('value', i);
            yearOption.innerText = i;
            this.appendChild(yearOption);
        }
    }
})

isMonthOption = false;
month.addEventListener('focus', function() {
    if(!isMonthOption){
        for(let l = 1; l <= 12; l++){
            const monthOption = document.createElement('option');
            monthOption.setAttribute('value', l);
            monthOption.innerText = l;
            this.appendChild(monthOption);
        }
    }
})

isDayOption = false;
day.addEventListener('focus', function() {
    if(!isDayOption){
        for(let k = 1; k <= 31; k++){
            const dayOption = document.createElement('option');
            dayOption.setAttribute('value', k);
            dayOption.innerText = k;
            this.appendChild(dayOption);
        }
    }
})

