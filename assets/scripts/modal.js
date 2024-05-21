// DOM Elements
const modalbg = document.querySelector(".modal-background");
const reservationModal = document.getElementById('reservation-modal');
const confirmationModal = document.getElementById('confirmation-modal');
const modalContent = document.querySelector('.modal-background .modal-content');

const modalBtn = document.querySelectorAll(".signup-btn");
const closeBtn = document.querySelectorAll('.close-btn');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));


// launch modal form
function launchModal() {
  modalContent.classList.remove('reverse-animation');
  modalbg.style.display = "block";

  confirmationModal.classList.add('hidden-modal');
  reservationModal.classList.remove('hidden-modal');

}
function closeModal() {
  modalContent.classList.add('reverse-animation');
  modalbg.style.display = "none";
}


/*******************             FORM VALIDATION            *******************/

// Caching selectors for DOM elements

const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const locationList = document.querySelector('.location-list');
const locationCheckboxes = document.querySelectorAll('.location-checkbox');
const agreementCheckbox = document.getElementById('agreement-checkbox');


// Regexp used for email validation 

const emailFilter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


// Adding validation on input events on form elements

firstName.addEventListener('input', ValidateFirstName);
lastName.addEventListener('input', ValidateLastName);
email.addEventListener('input', ValidateMail);
birthdate.addEventListener('input', ValidateBirthdate);
locationCheckboxes.forEach((checkbox) => checkbox.addEventListener('input', ValidateCheckboxes));
agreementCheckbox.addEventListener('input', ValidateAgreement);


// Validation functions for the different form fields

function ValidateFirstName() {
  // We consider the names to be valid if longer than 2 characters
  if (firstName.value.length >= 2) {
    firstName.parentNode.classList.remove('invalid');
    return true;
  } else {
    firstName.parentNode.classList.add('invalid');
    return false;
  }
}

function ValidateLastName() {
  // We consider the names to be valid if longer than 2 characters
  if (lastName.value.length >= 2) {
    lastName.parentNode.classList.remove('invalid');
    return true;
  } else {
    lastName.parentNode.classList.add('invalid');
    return false;
  }
}

function ValidateMail() {
  // Using the Regexp filter to check email validity
  if (emailFilter.test(email.value)) {
    email.parentNode.classList.remove('invalid');
    return true;
  } else {
    email.parentNode.classList.add('invalid');
    return false;
  }
}

function ValidateBirthdate() {
  const YEAR_IN_MS = 365.25 * 24 * 60 * 60 * 1000;
  const minimumAge = 13;

  // Gap is the difference between now and the birthday in years
  let gap = (new Date() - new Date(birthdate.value)) / YEAR_IN_MS;

  // The birthdate is valid if the gap is greater than the minimum age
  if (gap > minimumAge) {
    birthdate.parentNode.classList.remove('invalid');
    return true;
  } else {
    birthdate.parentNode.classList.add('invalid');
    return false;
  }
}

function ValidateCheckboxes() {
  let checked = Array.from(locationCheckboxes).some((cb) => cb.checked);
  if (checked) {
    locationList.classList.remove('invalid');
  } else {
    locationList.classList.add('invalid');
  }
  return checked;
}

function ValidateAgreement() {
  if (agreementCheckbox.checked) {
    agreementCheckbox.parentNode.classList.remove('invalid');
  } else {
    agreementCheckbox.parentNode.classList.add('invalid');
  }
  return agreementCheckbox.checked;
}

// Validation function for the whole form

const reservationForm = document.getElementById('reservation-form');

reservationForm.addEventListener('submit', (e) => {

  // Suppressing default form handling
  e.preventDefault();

  // Initializing a boolean to hold form validity
  var isValid = new Boolean(true);

  // Running all the validation functions in sequence
  // This allows the functions to update the DOM if the input is invalid
  if (!ValidateFirstName()) { isValid = false; }
  if (!ValidateLastName()) { isValid = false; }
  if (!ValidateMail()) { isValid = false; }
  if (!ValidateBirthdate()) { isValid = false; }
  if (!ValidateCheckboxes()) { isValid = false; }
  if (!ValidateAgreement()) { isValid = false; }

  // Trigger confirmation modal if the form is valid when submitted
  if (isValid) {
    confirmationModal.classList.remove('hidden-modal');
    reservationModal.classList.add('hidden-modal');
    reservationForm.reset();
  }
});
