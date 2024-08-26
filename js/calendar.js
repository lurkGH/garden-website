class Event {
    constructor(eventDate, eventDetails) {
        this.eventDate = eventDate;
        this.eventDetails = eventDetails;
    }
}

const calendarContainer = document.getElementById("calendar-container");
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;

function setupCalendar(change) {
    // Updates year and month based on change from arrow clicks
    if (month === 1 && change === -1) {
        month = 12;
        year--;
    } else if (month === 12 && change === 1) {
        month = 1;
        year++;
    } else {
        month += change;
    }

    calendarContainer.innerHTML = "";
    setupTheme();
    setupMonthYearRow();
    setupWeekdayRow();
    loadDays();
    loadCurrentDay();
    addEvents();
    //setupDetailsWindow();
    addEventListeners();
}

function setupTheme() {
    switch(month) {
        case 1:
            document.body.style.backgroundImage = "linear-gradient(to right, #B0E0E6, #FFFFFF)";
            break;
        case 2:
            document.body.style.backgroundImage = "linear-gradient(to right, #9966CC, #FFB6C1)";
            break;
        case 3:
            document.body.style.backgroundImage = "linear-gradient(to right, #00FF7F, #B0E0E6)";
            break;
        case 4:
            document.body.style.backgroundImage = "linear-gradient(to right, #FFB6C1, #FFD700)";
            break;
        case 5:
            document.body.style.backgroundImage = "linear-gradient(to right, #50C878, #FFD700)";
            break;
        case 6:
            document.body.style.backgroundImage = "linear-gradient(to right, #FFD700, #FF8C00)";
            break;
        case 7:
            document.body.style.backgroundImage = "linear-gradient(to right, #FF4500, #FFD700)";
            break;
        case 8:
            document.body.style.backgroundImage = "linear-gradient(to right, #FF8C00, #DAA520)";
            break;
        case 9:
            document.body.style.backgroundImage = "linear-gradient(to right, #6B8E23, #FFD700)";
            break;
        case 10:
            document.body.style.backgroundImage = "linear-gradient(to right, #FF7518, #FFD700)";
            break;
        case 11:
            document.body.style.backgroundImage = "linear-gradient(to right, #D2691E, #CD5C5C)";
            break;
        case 12:
            document.body.style.backgroundImage = "linear-gradient(to right, #F08080, #FFFFFF)";
            break;
        default:
            break;
    }
}

function setupMonthYearRow() {
    const monthNames = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"];
        calendarContainer.innerHTML += "<div class='month-row' id='left-arrow'>\u{2B98}</div>";
        calendarContainer.innerHTML += `<div class='month-row' id='month-year-name'>${monthNames[month - 1]} ${year}</div>`;
    calendarContainer.innerHTML += "<div class='month-row' id='right-arrow'>\u{2B9A}</div>";
}

function setupWeekdayRow() {
    const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
    for (let i = 0; i < 7; i++) {
        calendarContainer.innerHTML += `<div class="week-row">${weekdays[i]}</div>`
    }
}

function loadDays() {
    let totalDays = new Date(year, month, 0).getDate();
    let leadingDays = new Date(year, month - 1, 1).getDay();
    let trailingDays = (35 - totalDays - leadingDays);
    let finalDay = new Date(year, month - 1, 0).getDate() - leadingDays;

    // Sets up previous month's carryover days
    for (let i = 0; i < leadingDays; i++) {
        finalDay++
        calendarContainer.innerHTML += `<div class='date-box'><div class='overflow-date'>${finalDay}</div></div>`;
    }
    // Sets up current month's days
    for (let i = 1; i <= totalDays; i++) {
        let dateID = year + "-" + month + "-" + i;
        calendarContainer.innerHTML += `<div class='date-box'><div class='date' id='${dateID}'>${i}</div></div>`;
    }
    // Checks if month requires extra row
    if (totalDays + leadingDays > 35) {
        trailingDays = (42 - totalDays - leadingDays);
    }
    // Sets up next month's carryover days
    for (let i = 0; i < trailingDays; i++) {
        calendarContainer.innerHTML += `<div class='date-box'><div class='overflow-date'>${i + 1}</div></div>`;
    }    
}

function loadCurrentDay() {
    let currYear = new Date().getFullYear();
    let currMonth = new Date().getMonth() + 1;
    let currDay = new Date().getDate();
    let dateID = currYear + "-" + currMonth + "-" + currDay;
    let calendarDate = document.getElementById(dateID);
    if (calendarDate) {
        calendarDate.classList.add("current-day");
    }
}

function addEvents() {
    fetch("data/events.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const events = data.map(function(item) {
            return new Event(item.eventDate, item.eventDetails);
        });
        events.forEach(function(event) {
            let eventCell = document.getElementById(event.eventDate);
            if (eventCell) {
                let parentCell = eventCell.parentElement;
                parentCell.innerHTML += `<div class='event-details'>${event.eventDetails}</div>`;
            }
        });
    });
}

function setupDetailsWindow() {
    const detailsWindow = document.getElementById("details-container");
    const dateBoxes = document.querySelectorAll(".date-box");
    dateBoxes.forEach(dateBox => {
        dateBox.addEventListener("click", function(event) {
            const dateID = event.target.id;
            let selectedDate = document.getElementById(dateID).innerHTML;

            detailsWindow.innerHTML = "";
            detailsWindow.innerHTML += `<div>${selectedDate}</div>`;
        })
    })
}

function addEventListeners() {
    document.getElementById("left-arrow").addEventListener("click", () => setupCalendar(-1));
    document.getElementById("right-arrow").addEventListener("click", () => setupCalendar(1));
}

document.addEventListener("DOMContentLoaded", () => setupCalendar(0));