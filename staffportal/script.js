document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("loginForm");
    let loginMessage = document.getElementById("loginMessage");

    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let staffID = document.getElementById("staffID").value.trim();
        let password = document.getElementById("password").value.trim();

        if (staffID === "admin" && password === "1234") {
            loginMessage.style.color = "green";
            loginMessage.textContent = "Login successful! Redirecting...";
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        } else {
            loginMessage.style.color = "red";
            loginMessage.textContent = "Invalid login credentials.";
        }
    });
});


document.getElementById("toggleSidebar").addEventListener("click", function() {
    document.querySelector(".sidebar").classList.toggle("collapsed");
    document.querySelector(".main-content").classList.toggle("collapsed");
});
document.addEventListener("DOMContentLoaded", function () {
    const leaveForm = document.querySelector("form");
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");
    const leaveHistoryTable = document.querySelector("#leave-history tbody");

    // Load existing leave history from localStorage
    loadLeaveHistory();

    // Calculate leave days when date inputs change
    startDateInput.addEventListener("change", calculateLeaveDays);
    endDateInput.addEventListener("change", calculateLeaveDays);

    function calculateLeaveDays() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        if (startDate && endDate && endDate >= startDate) {
            const timeDiff = endDate.getTime() - startDate.getTime();
            const leaveDays = timeDiff / (1000 * 3600 * 24) + 1; // +1 to include the start date
            console.log(`Total Leave Days: ${leaveDays}`);
        } else {
            console.log("Invalid Date Selection");
        }
    }

    // Handle form submission
    leaveForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        const leaveType = document.getElementById("leave-type").value;
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const reason = document.getElementById("reason").value;

        if (!leaveType || !startDate || !endDate || !reason) {
            alert("Please fill in all fields.");
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end < start) {
            alert("End date cannot be before start date.");
            return;
        }

        const leaveDays = (end - start) / (1000 * 3600 * 24) + 1;

        // Create new leave record
        const newLeave = {
            leaveType,
            startDate,
            endDate,
            leaveDays,
            status: "Pending", // Default status
        };

        // Save to localStorage
        saveLeaveRequest(newLeave);

        // Append new request to the table
        addLeaveToHistory(newLeave);

        // Reset form
        leaveForm.reset();
    });

    function saveLeaveRequest(leave) {
        let leaveRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
        leaveRequests.push(leave);
        localStorage.setItem("leaveRequests", JSON.stringify(leaveRequests));
    }

    function loadLeaveHistory() {
        let leaveRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
        leaveRequests.forEach(addLeaveToHistory);
    }

    function addLeaveToHistory(leave) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${leave.leaveType}</td>
            <td>${leave.startDate}</td>
            <td>${leave.endDate}</td>
            <td>${leave.status}</td>
        `;
        leaveHistoryTable.appendChild(row);
    }
});
function togglePassword(fieldId) {
    let passwordField = document.getElementById(fieldId);
    let type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;
}
