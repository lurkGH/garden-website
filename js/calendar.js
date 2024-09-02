class Event {
    constructor(eventDate, eventType, eventDetails) {
        this.eventDate = eventDate;
        this.eventType = eventType;
        this.eventDetails = eventDetails;
    }
}

const mainElement = document.querySelector("main");
const calendarContainer = document.getElementById("calendar-container");
const detailsWindow = document.getElementById("details-container");
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let startX = 0;
let endX = 0;
let isSwiping = false;
const horizontalThreshold = 30;

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

    // Clear Calendar upon changing months
    calendarContainer.innerHTML = "";
    detailsWindow.innerHTML = "";

    // Setup functions
    setupTheme();
    setupMonthYearRow();
    setupWeekdayRow();
    loadDays();
    loadCurrentDay();
    addEvents();
    addEventListeners();
}

function setupTheme() {
    switch(month) {
        case 1:
            mainElement.style.backgroundImage = "linear-gradient(to right, white, powderblue, skyblue)";
            break;
        case 2:
            mainElement.style.backgroundImage = "linear-gradient(to right, powderblue, lightpink, plum)";
            break;
        case 3:
            mainElement.style.backgroundImage = "linear-gradient(to right, skyblue, aquamarine, palegreen)";
            break;
        case 4:
            mainElement.style.backgroundImage = "linear-gradient(to right, springgreen, lightpink, khaki)";
            break;
        case 5:
            mainElement.style.backgroundImage = "linear-gradient(to right, khaki, yellowgreen, goldenrod)";
            break;
        case 6:
            mainElement.style.backgroundImage = "linear-gradient(to right, darkkhaki, salmon, orange)";
            break;
        case 7:
            mainElement.style.backgroundImage = "linear-gradient(to right, darkorange, tomato, chocolate)";
            break;
        case 8:
            mainElement.style.backgroundImage = "linear-gradient(to right, salmon, sandybrown, goldenrod)";
            break;
        case 9:
            mainElement.style.backgroundImage = "linear-gradient(to right, olive, lightcoral, chocolate)";
            break;
        case 10:
            mainElement.style.backgroundImage = "linear-gradient(to right, sienna, darkorange, saddlebrown)";
            break;
        case 11:
            mainElement.style.backgroundImage = "linear-gradient(to right, chocolate, darksalmon, moccasin)";
            break;
        case 12:
            mainElement.style.backgroundImage = "linear-gradient(to right, peachpuff, pink, darkseagreen)";
            break;
        default:
            break;
    }
}


function setupMonthYearRow() {
    const monthNames = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"];
        calendarContainer.innerHTML += "<div class='month-row' id='left-arrow'><img class='arrow' src='./images/icon-arrow-left.png'></div>";
        calendarContainer.innerHTML += `<div class='month-row' id='month-year-name'>${monthNames[month - 1]} ${year}</div>`;
        calendarContainer.innerHTML += "<div class='month-row' id='right-arrow'><img class='arrow' src='./images/icon-arrow-right.png'></div>";
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
            return new Event(item.eventDate, item.eventType, item.eventDetails);
        });
        events.forEach(function(event) {
            let eventCell = document.getElementById(event.eventDate);
            if (eventCell) {
                let parentCell = eventCell.parentElement;
                let eventContainer = parentCell.querySelector(".event-container");
                let eventBall = document.createElement("div");
                let eventDetails = parentCell.querySelector(".event-details");
                // Creates an event container if it doesn't already exist
                if (!eventContainer) {
                    eventContainer = document.createElement("div");
                    eventContainer.className = "event-container";
                    parentCell.appendChild(eventContainer);
                }
                // Sets up and adds event ball to event container
                eventBall.className = `event-ball ${event.eventType}`;
                eventContainer.appendChild(eventBall);
                // Creates event-details div if it doesn't already exist
                if (!eventDetails) {
                    eventDetails = document.createElement("div");
                    eventDetails.className = "event-details";
                    parentCell.appendChild(eventDetails);
                    eventDetails.innerHTML += `<strong>${event.eventDate}</strong><br/>`;
                }
                eventDetails.innerHTML += `\u25CF ${event.eventDetails}<br/>`;
            }
        });
        setupDetailsWindow();
    });
}

function setupDetailsWindow() {
    const dateBoxes = document.querySelectorAll(".date-box");
    const currentDayElement = document.querySelector(".current-day");

    // Sets initial details window to current day event
    if (currentDayElement) {
        const todayBox = currentDayElement.parentElement;
        const todayDate = currentDayElement.id;
        const eventDetails = todayBox.querySelector(".event-details");
        if (eventDetails) {
            detailsWindow.innerHTML = `${eventDetails.innerHTML}`;
        } else {
            detailsWindow.innerHTML = `<strong>${todayDate}</strong></br>No events for today.`;
        }
    }

    // Adds click functionality for displaying event descriptions
    dateBoxes.forEach(dateBox => {
        dateBox.addEventListener("click", function() {
            const eventDetails = dateBox.querySelector(".event-details");
            const dateElement = dateBox.querySelector('.date');
            if (eventDetails) {
                detailsWindow.innerHTML = `${eventDetails.innerHTML}`;
            } else {
                if (dateElement && dateElement.id) {
                    detailsWindow.innerHTML = `<strong>${dateElement.id}</strong><br/>No events for this day.`;
                } else {
                    detailsWindow.innerHTML = "";
                }
            }
        });
    });
}

function addEventListeners() {
    document.getElementById("left-arrow").addEventListener("click", () => setupCalendar(-1));
    document.getElementById("right-arrow").addEventListener("click", () => setupCalendar(1));
}

mainElement.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwiping = false;
});

mainElement.addEventListener('touchmove', (e) => {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startX;
    const diffY = currentY - startY;

    // Prevents vertical scroll when swiping horizontally
    if (Math.abs(diffX) > horizontalThreshold && Math.abs(diffX) > Math.abs(diffY)) {
        isSwiping = true;
        e.preventDefault();
    }
});

mainElement.addEventListener('touchend', (e) => {
    if (isSwiping) {
        if (startX > e.changedTouches[0].clientX) {
            setupCalendar(1);
        } else {
            setupCalendar(-1);
        }
    }
});

document.addEventListener("DOMContentLoaded", () => setupCalendar(0));