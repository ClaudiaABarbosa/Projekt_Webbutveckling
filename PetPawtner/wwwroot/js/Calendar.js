const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcons = document.querySelectorAll(".icons span");

let date = new Date(),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth();

const months = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
];

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(),
        lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(),
        lastDayOfMonth = new Date(
            currentYear,
            currentMonth,
            lastDateOfMonth
        ).getDay(),
        lastDateOfPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();
    let liTags = "";

    // Add the last few days of the previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
        liTags += `<li class="inactive">${lastDateOfPreviousMonth - i + 1}</li>`;
    }

    // Add the days of the current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday =
            i === date.getDate() &&
                currentMonth === new Date().getMonth() &&
                currentYear === new Date().getFullYear()
                ? "active"
                : "";
        liTags += `<li class="${isToday}">${i}</li>`;
    }

    // Add the first few days of the next month
    for (let i = lastDayOfMonth; i < 6; i++) {
        liTags += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTags;
};

renderCalendar();

prevNextIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
        currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;

        // Update year and month if we move out of current year range
        if (currentMonth < 0 || currentMonth > 11) {
            date = new Date(currentYear, currentMonth, new Date().getDate());
            currentYear = date.getFullYear();
            currentMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});
