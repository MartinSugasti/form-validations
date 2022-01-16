const patternMismatchMessages = {
  firstName: 'Name only can have letters.',
  lastName: 'Last Name only can have letters.',
  password:
    'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
  city: 'City only can have letters.',
  state: 'State only can have letters.',
  zipCode: 'Zip Code must have a 5 digits number.',
};
const form = document.getElementsByTagName('form')[0];
const inputs = document.querySelectorAll('input, select');

inputs.forEach((input) => {
  input.addEventListener('input', function () {
    checkInputValidation(input);
  });
});

form.addEventListener('submit', function (event) {
  // If the email field is valid, we let the form submit

  if (!event.target.checkValidity()) {
    inputs.forEach((input) => {
      checkInputValidation(input);
    });

    // Focus on the first invalid input
    const invalidInput = document.querySelector('input.invalid, select.invalid');
    invalidInput.focus();
    if (invalidInput.nodeName === 'INPUT') {
      invalidInput.select();
    }

    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  }
});

function checkInputValidation(input) {
  // Each time the user types something, we check if the form fields are valid.

  const inputError = document.querySelector(`#${input.id} ~ span.error`);
  let password = document.querySelector('#password').value;

  if (input.id === 'passwordConfirmation' && input.value != password) {
    // Password confirmation should be equal to password
    input.classList.add('invalid');
    inputError.textContent = 'Must match password.';
  } else if (input.validity.valid) {
    // In case there is an error message visible, if the field is valid, we remove the error message.
    inputError.textContent = '';
    input.classList.remove('invalid');
  } else {
    // If there is still an error, show the correct error
    showError(input, inputError);
  }
}

function showError(input, inputError) {
  input.classList.add('invalid');

  if (input.validity.valueMissing) {
    // If the field is empty
    inputError.textContent = "Can't be empty.";
  } else if (input.validity.typeMismatch) {
    // If the field doesn't contain the correct tpye
    inputError.textContent = 'Entered value is not the correct type.';
  } else if (input.validity.patternMismatch) {
    // If the data does not match the pattern
    inputError.textContent = patternMismatchMessages[input.id];
  }
}
