"use strict";
let password = document.querySelector('.password-txt');
let form = document.querySelector('.generator-form');
let copyButton = document.querySelector('copy-btn');
let levelText = document.querySelector('.current-lvl');
const checkBoxes = document.querySelectorAll('input[type=checkbox]');
let range = document.querySelector('.range');
let lenghtNumber = document.querySelector('.lenght-number');
let barsLvl = document.querySelector('#bars');
const checkboxChars = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]\\:;?><,./-="
};
console.log(checkBoxes);
const generatePassword = (e) => {
    e.preventDefault();
    let currentRangeValue = parseInt(range.value);
    if (levelText) {
        levelText.innerHTML = calculateSecurityLevel(currentRangeValue, checkBoxes);
    }
};
const updateTxt = (e) => {
    let currentRangeValue = e.target.value;
    if (lenghtNumber) {
        lenghtNumber.innerHTML = currentRangeValue;
    }
};
const calculateSecurityLevel = (length, selectedCheckboxes) => {
    const checkedCount = Array.from(selectedCheckboxes).filter(checkbox => checkbox.checked).length;
    console.log(length);
    console.log(checkedCount);
    if (length < 8 || checkedCount === 1) {
        barsLvl === null || barsLvl === void 0 ? void 0 : barsLvl.setAttribute('class', 'too-weak');
        return 'Too Weak!';
    }
    else if (length < 12 && checkedCount > 1) {
        barsLvl === null || barsLvl === void 0 ? void 0 : barsLvl.setAttribute('class', 'weak');
        return 'Weak';
    }
    else if (length <= 20 && checkedCount >= 2) {
        barsLvl === null || barsLvl === void 0 ? void 0 : barsLvl.setAttribute('class', 'medium');
        return 'Medium';
    }
    else if (length >= 16 && checkedCount >= 3) {
        barsLvl === null || barsLvl === void 0 ? void 0 : barsLvl.setAttribute('class', 'strong');
        return 'Strong';
    }
    else {
        return '';
    }
};
form === null || form === void 0 ? void 0 : form.addEventListener('submit', generatePassword);
range === null || range === void 0 ? void 0 : range.addEventListener('change', updateTxt);
