// Code for responsive navbar display

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

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

// Running basic form field validation on input

const formFields = document.querySelectorAll(".form-field");

formFields.forEach((field) => field.querySelector('input').addEventListener('input', ValidateInput));


function ValidateInput() {
  if (this.validity.valid) {
    this.parentNode.classList.remove('invalid');
    return true;
  } else {
    this.parentNode.classList.add('invalid');
    return false;
  }
}


// Validating location checkboxes

const locationList = document.querySelector('.location-list');
const locationCheckboxes = document.querySelectorAll('.location-checkbox');

// Attaching validation function on input change events

locationCheckboxes.forEach((checkbox) => checkbox.addEventListener('input', ValidateCheckboxes));

// Validation function

function ValidateCheckboxes() {

  let checked = Array.from(locationCheckboxes).some((cb) => cb.checked);

  if (checked) {
    locationList.classList.remove('invalid');
  } else {
    locationList.classList.add('invalid');
  }

  return checked;

}

// Validating all fields on submit

const reservationForm = document.getElementById('reservation-form');

reservationForm.addEventListener('submit', (e) => {

  // Suppressing default form handling
  e.preventDefault();

  // Initializing a boolean to hold form status
  var isValid = new Boolean(true);


  // Checking the validity of all fields in the form
  formFields.forEach((field) => {
    if (!field.querySelector('input').validity.valid) {
      field.classList.add('invalid');
      isValid = false;
    }
  });

  // Checking that a location checkbox has been selected
  if (!ValidateCheckboxes()) {
    isValid = false;
  };


  // Trigger confirmation modal if the form is valid when submitted
  if (isValid) {
    confirmationModal.classList.remove('hidden-modal');
    reservationModal.classList.add('hidden-modal');
    reservationForm.reset();
  };

});
