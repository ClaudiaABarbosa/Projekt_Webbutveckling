/*gömmer menyn i navbaren vid mindre skärmstorlekar */
function menuOptions() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

/*validerar att slutdatum är efter startdatum */

const startDateInput = document.querySelector(".start-date");
const endDateInput = document.querySelector(".end-date");

endDateInput.addEventListener("change", () => {
    if (new Date(startDateInput.value) > new Date(endDateInput.value)) {
        alert("Slutdatum bör vara efter startdatum");
        endDateInput.value = ""; // Clear the incorrect input
    }
});

/*Berättar för användaren att man nu lämnar sidan */
document.querySelectorAll(".social-icon").forEach((icon) => {
    icon.addEventListener("click", (event) => {
        if (!confirm("Du lämnar nu PetPawtner. Vill du fortsätta?")) {
            event.preventDefault();
        }
    });
});

// Toggle active class for buttons in the first group (btn)
document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
        document
            .querySelectorAll(".btn")
            .forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
    });
});

// Toggle active class for buttons in the second group (secondBtn)
document.querySelectorAll(".secondBtn").forEach((button) => {
    button.addEventListener("click", () => {
        document
            .querySelectorAll(".secondBtn")
            .forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
    });
});
