const calendar = document.getElementById("calendar-container");

function populateCalendar() {
    let date = new Date();

    for (let i = 0; i < 7; i++) {
        switch(i) {
            case 0:
            case 6:
                calendar.innerHTML += "<div class='item first-row'>S</div>";
                break;
            case 1:
                calendar.innerHTML += "<div class='item first-row'>M</div>";
                break;
            case 2:
            case 4:
                calendar.innerHTML += "<div class='item first-row'>T</div>";
                break;
            case 3:
                calendar.innerHTML += "<div class='item first-row'>W</div>";
                break;
            case 5:
                calendar.innerHTML += "<div class='item first-row'>F</div>";
                break;
            default:
                break;
        }
    }
    addUnusedDays(2);
    for (let i = 0; i < 31; i++) {
        calendar.innerHTML += "<div class='item'></div>";
        let day = document.getElementsByClassName("item")[i + 9]; // hard-coded, change later
        day.innerHTML += "<p class='date'>" + (i + 1) + "</p>"
        if (date.getDate() === (i + 1)) {
            let currDay = document.getElementsByClassName("date")[i];
            currDay.classList.add("current-date");
        }
    }
    addUnusedDays(2);
    addEvents();
}

function addUnusedDays(amount) {
    for (let i = 0; i < amount; i++) {
        calendar.innerHTML += "<div class='item unused'></div>";
    }
}

function addEvents() {
    let dateCell = document.getElementsByClassName("item");
    dateCell[23].innerHTML += "<p class='event'>10:00 a.m. Wedding</p>"; // hard-coded
}

document.addEventListener("DOMContentLoaded", populateCalendar());