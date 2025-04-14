function loginUser() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const matchedUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (matchedUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
    sessionStorage.removeItem("loggedOut");

    // Hide login form
    document.getElementById("login-form").style.display = "none";

    // Show spinner
    document.getElementById("spinner").style.display = "flex";

    // Optionally blur background
    document.body.classList.add("blurred");

    // Redirect after delay
    setTimeout(() => {
      window.location.href = "/HTML/Dashboard.html";
    }, 1500);
  } else {
    alert("Invalid email or password!");
  }
}

// Run this once to store users in localStorage
const usersData = [
  {
    id: 1,
    username: "John Doe",
    email: "user1@bacancy.com",
    password: "User1@123",
  },
  {
    id: 2,
    username: "Jane Smith",
    email: "user2@bacancy.com",
    password: "User2@123",
  },
  {
    id: 3,
    username: "Mike Johnson",
    email: "user3@bacancy.com",
    password: "User3@123",
  },
];

localStorage.setItem("users", JSON.stringify(usersData));  