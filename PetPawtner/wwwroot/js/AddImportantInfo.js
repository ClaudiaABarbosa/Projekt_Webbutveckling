// Retrieve reminders from localStorage or set as an empty array if none exist
let information = JSON.parse(localStorage.getItem("informations")) || [];
const informationInput = document.getElementById("informationInput"); // Fixed ID
const infoList = document.getElementById("infoList");
const addBtn = document.querySelector(".btn");
const clearBtn = document.getElementById("clearBtn");

// Add event listeners on page load
document.addEventListener("DOMContentLoaded", function () {
    addBtn.addEventListener("click", addTask);
    informationInput.addEventListener("keydown", function (event) {
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
    const newInformation = informationInput.value.trim();
    if (newInformation !== "") {
        information.push({ text: newInformation, disabled: false }); // Fixed array name
        saveToLocalStorage();
        informationInput.value = "";
        displayTasks();
    }
}

// Display reminders in the list
function displayTasks() {
    infoList.innerHTML = "";
    information.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
            <p id="information-${index}" class="${item.disabled ? "disabled" : ""}" onclick="editTask(${index})">${item.text}</p>
        `;
        infoList.appendChild(p);
    });
}

// Edit existing reminder task
function editTask(index) {
    const infoItem = document.getElementById(`information-${index}`);
    const existingText = information[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    infoItem.replaceWith(inputElement); // Corrected variable name
    inputElement.focus();

    inputElement.addEventListener("blur", function () {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            information[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    });
}

// Toggle completion state of the reminder task
function toggleTask(index) {
    information[index].disabled = !information[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

// Delete all reminder tasks
function deleteAllTasks() {
    information = []; // Fixed array name
    saveToLocalStorage();
    displayTasks();
}

// Save reminders to localStorage
function saveToLocalStorage() {
    localStorage.setItem("informations", JSON.stringify(information));
}
