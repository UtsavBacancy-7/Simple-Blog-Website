// DOMContentLoaded event listener to ensure the page is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Retrieve logged-in user data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // Check if a user is logged in
    if (loggedInUser) {
        // Set user details dynamically in the sidebar
        setUserData(loggedInUser);
    } else {
        // If no logged-in user is found, redirect to the login page
        window.location.href = "/HTML/index.html";
    }
});

// Function to set user data dynamically
function setUserData(user) {
    document.getElementById("userName").textContent = user.username;
}

// Logout functionality
function logoutUser() {
    // Remove the logged-in user data from localStorage and set session flag
    localStorage.removeItem("loggedInUser");
    sessionStorage.setItem("loggedOut", "true");

    // Redirect to the login page
    window.location.href = "/HTML/index.html";
}

// Prevent navigating back to the dashboard after logout
if (sessionStorage.getItem("loggedOut") === "true") {
    window.location.href = "/HTML/index.html"; // Redirect if logged out
}

// Prevent caching of the dashboard page to avoid back navigation issues
window.onbeforeunload = function () {
    sessionStorage.setItem("visited", "true");
};

// Override the back button to prevent navigating back to the dashboard
window.history.pushState(null, "", window.location.href);
window.onpopstate = function () {
    window.history.pushState(null, "", window.location.href);
};

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.checked = true;
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.checked = false;
    }
}

// Check for saved theme preference on load
function checkTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        themeToggle.checked = false;
    }
}

// Add event listener to the toggle
document.getElementById('themeToggle').addEventListener('change', toggleTheme);