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