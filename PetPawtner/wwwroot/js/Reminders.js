// Retrieve reminders from localStorage or set as an empty array if none exist
let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
const reminderInput = document.getElementById("reminderInput");
const reminderList = document.getElementById("reminderList");
const reminderCounter = document.getElementById("reminderCounter");
const addBtn = document.querySelector(".btn");
const clearBtn = document.getElementById("clearBtn");

// Add event listeners on page load
document.addEventListener("DOMContentLoaded", function () {
    addBtn.addEventListener("click", addTask);
    reminderInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default Enter key behavior
            addTask();
        }
    });
    clearBtn.addEventListener("click", deleteAllTasks);
    displayTasks();
});

// Add new reminder task
function addTask() {
    const newReminder = reminderInput.value.trim();
    if (newReminder !== "") {
        reminders.push({ text: newReminder, disabled: false });
        saveToLocalStorage();
        reminderInput.value = "";
        displayTasks();
    }
}

// Display reminders in the list
function displayTasks() {
    reminderList.innerHTML = "";
    reminders.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
        <div class="checkbox-container"> 
          <input type="checkbox" class="reminder-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""
            }>
          <p id="reminder-${index}" class="${item.disabled ? "disabled" : ""
            }" onclick="editTask(${index})">${item.text}</p>
        </div>
      `;
        p.querySelector(".reminder-checkbox").addEventListener("change", () =>
            toggleTask(index)
        );
        reminderList.appendChild(p);
    });
    reminderCounter.textContent = reminders.length;
}

// Edit existing reminder task
function editTask(index) {
    const reminderItem = document.getElementById(`reminder-${index}`);
    const existingText = reminders[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    reminderItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function () {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            reminders[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    });
}

// Toggle completion state of the reminder task
function toggleTask(index) {
    reminders[index].disabled = !reminders[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

// Delete all reminder tasks
function deleteAllTasks() {
    reminders = [];
    saveToLocalStorage();
    displayTasks();
}

// Save reminders to localStorage
function saveToLocalStorage() {
    localStorage.setItem("reminders", JSON.stringify(reminders));
}
