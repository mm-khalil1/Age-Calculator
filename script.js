/*
The provided JavaScript code is designed to handle input from a user interface 
related to dates, specifically for calculating and displaying an individual's age 
based on their birth date. It utilizes various functions to validate input, 
calculate age, and manage error messages, ensuring a smooth user experience.

Author: Mahmoud Khalil
Date: 19-2-2024
*/

const DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const inputElements = document.querySelectorAll('.card__input');
const submitButton = document.querySelector('.card__button');
const resultElement = document.querySelector('.card__resultValue');

/**
 * Calculates the age based on the birth date and the current date.
 * @param {Date} birthDate - The birth date of the individual.
 * @param {Date} currentDate - The current date.
 * @returns {number} - The calculated age.
 */
const calculateAge = (birthDate, currentDate) => {
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    if (birthDate.getMonth() > currentDate.getMonth()){
        --age;
    }
    else if (birthDate.getMonth() === currentDate.getMonth() 
            && birthDate.getDay() < currentDate.getDay()){
        --age;
    }
    return age;
}

/**
 * Displays an error message by adding the 'card__input--error' class to the specified input element.
 * @param {HTMLElement} inputElement - The input element to display the error message for.
 */
function displayErrorMessage(inputElement) {
    inputElement.classList.add('card__input--error');
}

/**
 * Clears the error message by removing the 'card__input--error' class from the specified input element.
 * @param {HTMLElement} inputElement - The input element to clear the error message for.
 */
function clearErrorMessage(inputElement) {
    inputElement.classList.remove('card__input--error');
}

/**
 * Checks if a given number is a valid positive integer.
 * @param {number} num - The number to check.
 * @returns {boolean} - True if the number is a valid positive integer, false otherwise.
 */
const isValidNum = (num) => (!isNaN(num) && num >= 1 && Number.isInteger(num));

/**
 * Validates the provided date (day, month, year) to ensure it is valid.
 * Displays error messages for invalid inputs.
 * @param {number} day - The day part of the date.
 * @param {number} month - The month part of the date.
 * @param {number} year - The year part of the date.
 * @returns {boolean} - True if the date is valid, false otherwise.
 */
const isValidDate = (day, month, year) => {
    let errorElements = [];
    const currentYear = new Date().getFullYear();

    if (!isValidNum(year) || year > currentYear) {
        errorElements.push('year');
    }

    if (!isValidNum(month) || month > 12) {
        errorElements.push('month');
    }

    const febDaysFix = (month === 2 && year % 4 === 0) ? 1 : 0;

    if (!isValidNum(day) || day > 31 || day > (DAYS_IN_MONTHS[month - 1] + febDaysFix)) {
        errorElements.push('day');
    }

    if (errorElements.length > 0) {
        errorElements.forEach(id => displayErrorMessage(document.getElementById(id)));
        return false;
    }

    return true;
}

/**
 * Displays the calculated age based on the provided birth date.
 * @param {number} day - The day part of the birth date.
 * @param {number} month - The month part of the birth date.
 * @param {number} year - The year part of the birth date.
 */
function displayAge(day, month, year) {
    const currentDate = new Date();
    const birthDate = new Date(year, month - 1, day);
    
    if (birthDate < currentDate) {
        const age = calculateAge(birthDate, currentDate);
        resultElement.innerHTML = age;
    } else {
        resultElement.innerHTML = '--';
        inputElements.forEach(element => displayErrorMessage(element));
    }
}

/**
 * Retrieves the input values (day, month, year) and validates them.
 * Displays the age if the date is valid, otherwise clears the age display and shows error messages.
 */
function onClickHandler() {
    const day = parseFloat(document.getElementById('day').value);
    const month = parseFloat(document.getElementById('month').value);
    const year = parseFloat(document.getElementById('year').value);

    inputElements.forEach(element => clearErrorMessage(element));
    if (isValidDate(day, month, year)) {
        displayAge(day, month, year);
    } else {
        resultElement.innerHTML = '--';
    }
}

// Add an event listener to the submit button to trigger the onClickHandler function when clicked.
submitButton.addEventListener('click', onClickHandler);

// Display the age when Enter is pressed
inputElements.forEach((element) => {
    element.addEventListener('keydown', (event) => {
        event.key === 'Enter' && onClickHandler();
    });
});