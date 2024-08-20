const calendar = document.getElementById("calendar-container");

function populateCalendar() {
    // Gets number of days in month based on first day of next month
    const totalDays = new Date("2024-09-01").getDate();
    // Gets number of unused days at the start of the calendar
    const unusedDaysBefore = new Date("2024-08-01").getDay() + 1;
    const unusedDaysAfter = (35 - totalDays - unusedDaysBefore);
   
    calendar.innerHTML += "<div class='item' id='month-year-row'></div>"
    let topRow = document.getElementById("month-year-row");
    topRow.innerHTML = "August 2024"

    // Sets up weekday row
    for (let i = 0; i < 7; i++) {
        calendar.innerHTML += "<div class='item first-row'></div>";
        let firstRow = document.getElementsByClassName("first-row");
        switch(i) {
            case 0:
            case 6:
                firstRow[i].innerHTML = "S";
                break;
            case 1:
                firstRow[i].innerHTML = "M";
                break;
            case 2:
            case 4:
                firstRow[i].innerHTML = "T";
                break;
            case 3:
                firstRow[i].innerHTML = "W";
                break;
            case 5:
                firstRow[i].innerHTML = "F";
                break;
            default:
                break;
        }
    }

    addUnusedDays(unusedDaysBefore);

    for (let i = 1; i <= totalDays; i++) {
        let date = new Date().getDate();
        calendar.innerHTML += "<div class='item'></div>";
        let day = document.getElementsByClassName("item")[i + 7 + unusedDaysBefore];
        day.innerHTML += "<p class='date'>" + i + "</p>"
        if (date === i) {
            let currDay = document.getElementsByClassName("date")[i - 1];
            currDay.classList.add("current-date");
        }
    }

    if (unusedDaysAfter > 0) {
        addUnusedDays(unusedDaysAfter);
    }
    
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