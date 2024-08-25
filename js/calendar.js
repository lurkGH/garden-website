class Event {
    constructor(eventDate, eventDetails) {
        this.eventDate = eventDate;
        this.eventDetails = eventDetails;
    }
}

const calendar = document.getElementById("calendar-container");
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

function populateCalendar(change) {
    // Updates the global month and year based on the change
    if (currentMonth === 0 && change === -1) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth === 11 && change === 1) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth += change;
    }

    let totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    let unusedDaysBefore = new Date(currentYear, currentMonth, 1).getDay();
    let unusedDaysAfter = (35 - totalDays - unusedDaysBefore);

    // Clears the calendar for changing months
    calendar.innerHTML = "";

    // Resets gridTemplate to its default state
    calendar.style.gridTemplate = "5vh 5vh repeat(5, 10vh) / repeat(7, 1fr)";

    // If the month requires an additional row, updates gridTemplate
    if (unusedDaysBefore + totalDays > 35) {
        calendar.style.gridTemplate = "5vh 5vh repeat(6, 10vh) / repeat(7, 1fr)";
        unusedDaysAfter = (42 - totalDays - unusedDaysBefore);
    }

    // Adds first row elements
    calendar.innerHTML += "<div class='item arrow' id='left-arrow'>⮘</div>";
    calendar.innerHTML += "<div class='item' id='month-year-row'></div>";
    calendar.innerHTML += "<div class='item arrow' id='right-arrow'>⮚</div>";

    // Sets the date and year in the top row
    let firstRow = document.getElementById("month-year-row");
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    firstRow.innerHTML = monthNames[currentMonth] + " " + currentYear;

    // Sets up the weekday row
    const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
    for (let i = 0; i < 7; i++) {
        calendar.innerHTML += `<div class='item first-row'>${weekdays[i]}</div>`;
    }

    addUnusedDays(unusedDaysBefore);

    // Sets up the rows for the dates
    for (let i = 1; i <= totalDays; i++) {
        let dayID = currentYear + "-" + (currentMonth + 1) + "-" + i;
        calendar.innerHTML += `<div class='item' id='${dayID}'></div>`;
        let dayCell = document.getElementsByClassName("item")[i + 9 + unusedDaysBefore];
        dayCell.innerHTML += `<p class='date'>${i}</p>`;
        if (new Date().getFullYear() === currentYear && new Date().getMonth() === currentMonth && new Date().getDate() === i) {
            let currDay = document.getElementsByClassName("date")[i - 1];
            currDay.classList.add("current-date");
        }
    }

    if (unusedDaysAfter > 0) {
        addUnusedDays(unusedDaysAfter);
    }

    addEvents();

    // Adds event listeners to the arrow buttons
    document.getElementById("left-arrow").addEventListener("click", () => populateCalendar(-1));
    document.getElementById("right-arrow").addEventListener("click", () => populateCalendar(1));
}

function addUnusedDays(amount) {
    for (let i = 0; i < amount; i++) {
        calendar.innerHTML += "<div class='item unused'></div>";
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
        // Loops through the events and add the event details to the matching date cells
        events.forEach(function(event) {
            // Finds the element with the ID that matches the eventDate
            let eventCell = document.getElementById(event.eventDate);
            if (eventCell) {
                eventCell.innerHTML += `<div class='event-details'>${event.eventDetails}</div>`;
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => populateCalendar(0));