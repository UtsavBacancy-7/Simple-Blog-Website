// Get references to DOM elements
const signInBtn = document.getElementById('sign-in');
const getStartedBtn = document.getElementById('get-started');
const startReadingBtn = document.getElementById('start-reading');
const loginForm = document.getElementById('login-form');
const closeFormBtn = document.getElementById('close-form');

// Elements that should be blurred when login form is open
const elementsToBlur = [
  document.querySelector('header'),
  document.querySelector('.main-content'),
  document.querySelector('footer')
];

// Function to display login form and apply blur to background
function openLoginForm() {
  loginForm.style.display = 'flex';
  elementsToBlur.forEach(el => el.classList.add('blur'));
}

// Function to hide login form and remove blur from background
function closeLoginForm() {
  loginForm.style.display = 'none';
  elementsToBlur.forEach(el => el.classList.remove('blur'));
}

// Attach event listeners to buttons to open login form
signInBtn.addEventListener('click', openLoginForm);
getStartedBtn.addEventListener('click', openLoginForm);
startReadingBtn.addEventListener('click', openLoginForm);

// Attach event listener to close button to hide login form
closeFormBtn.addEventListener('click', closeLoginForm);

// Close the login form when clicking outside the form container
window.addEventListener('click', (event) => {
  if (event.target === loginForm) {
    closeLoginForm();
  }
});