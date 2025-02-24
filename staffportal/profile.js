document.getElementById("passwordForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let currentPassword = document.getElementById("current-password").value;
    let newPassword = document.getElementById("new-password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let message = document.getElementById("password-message");

    // Simulated existing password
    let storedPassword = "password123";  // This should come from a database

    if (currentPassword !== storedPassword) {
        message.textContent = "❌ Incorrect current password.";
        message.style.color = "red";
        return;
    }

    if (newPassword !== confirmPassword) {
        message.textContent = "❌ New passwords do not match.";
        message.style.color = "red";
        return;
    }

    if (newPassword.length < 6) {
        message.textContent = "❌ Password must be at least 6 characters.";
        message.style.color = "red";
        return;
    }

    // Simulating password update
    storedPassword = newPassword;
    message.textContent = "✅ Password updated successfully!";
    message.style.color = "green";

    // Clear fields
    document.getElementById("passwordForm").reset();
});
function togglePassword(fieldId) {
    let passwordField = document.getElementById(fieldId);
    let type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;
}
