// Code for finding current date
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

// Finding first day of month
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let firstDay = (new Date(currentYear, currentMonth)).getDay();
let daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();

// -----------------
today = mm + '/' + dd + '/' + yyyy;
$("#month-year").append(today);
console.log(today)

const calendar = document.querySelector("#calendar-container")

for (let index = 0; index < firstDay; index++) {
    calendar.insertAdjacentHTML("beforeend", `<div class="day"></div>`);
}

for (let day = 1; day <= daysInMonth; day++) {
    calendar.insertAdjacentHTML("beforeend", `<div class="day">${day}</div>`);
}