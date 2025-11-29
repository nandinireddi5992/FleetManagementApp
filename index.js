let fleetData = [];

// Add Fleet
document.getElementById("addBtn").addEventListener("click", function () {
    let reg = document.getElementById("regno").value.trim();
    let cat = document.getElementById("category").value;
    let driver = document.getElementById("driver").value.trim();
    let available = document.getElementById("isAvailable").value;

    // Validation
    if (!reg || !cat || !driver) {
        alert("All fields are required");
        return;
    }

    let obj = {
        id: Date.now(),
        regNo: reg,
        category: cat,
        driver: driver,
        availability: available,
        img: "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png"
    };

    fleetData.push(obj);

    // Clear form
    document.getElementById("regno").value = "";
    document.getElementById("category").value = "";
    document.getElementById("driver").value = "";
    document.getElementById("isAvailable").value = "";

    renderData(fleetData);
});

// Render fleet cards
function renderData(arr) {
    let container = document.getElementById("fleetContainer");
    container.innerHTML = "";

    arr.forEach(item => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${item.img}" width="100%">
            <h3>${item.regNo}</h3>
            <p><b>Category:</b> ${item.category}</p>
            <p><b>Driver:</b> ${item.driver}</p>
            <p><b>Status:</b> ${item.availability}</p>

            <button class="updateBtn">Update Driver</button>
            <button class="availabilityBtn">Change Availability</button>
            <button class="deleteBtn">Delete</button>
        `;

        // Update Driver
        card.querySelector(".updateBtn").addEventListener("click", function () {
            let newDriver = prompt("Enter new driver name:");
            if (newDriver && newDriver.trim() !== "") {
                item.driver = newDriver.trim();
                renderData(fleetData);
            } else {
                alert("Driver name cannot be empty.");
            }
        });

        // Change Availability
        card.querySelector(".availabilityBtn").addEventListener("click", function () {
            item.availability = item.availability === "Available" ? "Unavailable" : "Available";
            renderData(fleetData);
        });

        // Delete Vehicle
        card.querySelector(".deleteBtn").addEventListener("click", function () {
            if (confirm("Are you sure you want to delete this vehicle?")) {
                fleetData = fleetData.filter(v => v.id !== item.id);
                renderData(fleetData);
            }
        });

        container.appendChild(card);
    });
}

// FILTERING

document.getElementById("filterCategory").addEventListener("change", applyFilters);
document.getElementById("filterAvailability").addEventListener("change", applyFilters);

function applyFilters() {
    let cat = document.getElementById("filterCategory").value;
    let avail = document.getElementById("filterAvailability").value;

    let filtered = fleetData.filter(item => {
        let categoryMatch = (cat === "All" || item.category === cat);
        let availMatch = (avail === "All" || item.availability === avail);

        return categoryMatch && availMatch;
    });

    renderData(filtered);
}

// Clear Filter
document.getElementById("clearFilter").addEventListener("click", function () {
    document.getElementById("filterCategory").value = "All";
    document.getElementById("filterAvailability").value = "All";

    renderData(fleetData);
});
