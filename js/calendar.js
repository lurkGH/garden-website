const calendar = document.getElementById("calendar-container");

function populateCalendar(change) {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    // If month is changed by user, updates variables
    if (month === 0 && change === -1) {
        month = 11;
        year -= 1;
    } else if (month === 11 && change === 1) {
        month = 0;
        year += 1;
    } else {
        month += change;
    }

    let totalDays = new Date(year, month + 1, 0).getDate();
    let unusedDaysBefore = new Date(year, month, 1).getDay();
    let unusedDaysAfter = (35 - totalDays - unusedDaysBefore);

    // Clears calendar for changing months
    calendar.innerHTML = "";

    // Accounts for months in which calendar extends another row
    if (unusedDaysBefore > 4) {
        calendar.style.gridTemplate = "5vh 5vh repeat(6, 10vh) / repeat(7, 1fr)";
        unusedDaysAfter = (42 - totalDays - unusedDaysBefore)
    }

    // Adds first row elements
    calendar.innerHTML += "<div class='item arrow' id='left-arrow'>⮘</div>";
    calendar.innerHTML += "<div class='item' id='month-year-row'></div>";
    calendar.innerHTML += "<div class='item arrow' id='right-arrow'>⮚</div>";

    // Sets the date and year in the top row
    let firstRow = document.getElementById("month-year-row");
    switch(month) {
        case 0:
            firstRow.innerHTML = "January " + year;
            break;
        case 1:
            firstRow.innerHTML = "February " + year;
            break;
        case 2:
            firstRow.innerHTML = "March " + year;
            break;
        case 3:
            firstRow.innerHTML = "April " + year;
            break;
        case 4:
            firstRow.innerHTML = "May " + year;
            break;
        case 5:
            firstRow.innerHTML = "June " + year;
            break;
        case 6:
            firstRow.innerHTML = "July " + year;
            break;
        case 7:
            firstRow.innerHTML = "August " + year;
            break;
        case 8:
            firstRow.innerHTML = "September " + year;
            break;
        case 9:
            firstRow.innerHTML = "October " + year;
            break;
        case 10:
            firstRow.innerHTML = "November " + year;
            break;
        case 11:
            firstRow.innerHTML = "December " + year;
            break;
        default:
            break;
    }

    // Sets up the weekday row
    for (let i = 0; i < 7; i++) {
        calendar.innerHTML += "<div class='item first-row'></div>";
        let secRow = document.getElementsByClassName("first-row");
        switch(i) {
            case 0:
            case 6:
                secRow[i].innerHTML = "S";
                break;
            case 1:
                secRow[i].innerHTML = "M";
                break;
            case 2:
            case 4:
                secRow[i].innerHTML = "T";
                break;
            case 3:
                secRow[i].innerHTML = "W";
                break;
            case 5:
                secRow[i].innerHTML = "F";
                break;
            default:
                break;
        }
    }

    addUnusedDays(unusedDaysBefore);

    // Sets up the rows for the dates
    for (let i = 1; i <= totalDays; i++) {
        calendar.innerHTML += "<div class='item'></div>";
        let dayCell = document.getElementsByClassName("item")[i + 9 + unusedDaysBefore];
        dayCell.innerHTML += "<p class='date'>" + i + "</p>"
        if (date.getDate() === i) {
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

document.addEventListener("DOMContentLoaded", populateCalendar(0));