let password = document.querySelector('.password-txt') as HTMLSpanElement
let form = document.querySelector('.generator-form')
let copyButton =  document.querySelector('.copy-btn')
let copyAlert = document.querySelector('.copy-alert')
let levelText = document.querySelector('.current-lvl')
const checkBoxes = document.querySelectorAll<HTMLInputElement>('input[type=checkbox]');
let range = document.querySelector('.range') as HTMLInputElement
let lenghtNumber = document.querySelector('.lenght-number')
let barsLvl = document.querySelector('#bars')
let checkUppercase = document.querySelector('#uppercase') as HTMLInputElement
let checkLowercase = document.querySelector('#lowercase') as HTMLInputElement
let checkNumbers = document.querySelector('#numbers') as HTMLInputElement
let checkSymbols = document.querySelector('#symbols') as HTMLInputElement

window.onload = () => {

    range.value = '10';

    checkBoxes.forEach(checkbox => checkbox.checked = false);
}

const checkboxChars = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: "0123456789",
    symbols: "!@#$%^&*()"
}

const generatePassword = (e:Event):void => {
    e.preventDefault();
    let currentRangeValue: number = parseInt(range.value)
    let chars = ''
    let passwordGenerated = ''
    const checkedCount = Array.from(checkBoxes).filter(checkbox => checkbox.checked).length;
    if(levelText &&   checkedCount > 0){
        levelText.innerHTML= calculateSecurityLevel(currentRangeValue, checkedCount )
    }

    if(checkUppercase.checked){
        chars+=checkboxChars.uppercase
    }
    if(checkLowercase.checked){
        chars+=checkboxChars.lowercase
    }
    if(checkNumbers.checked){
        chars+=checkboxChars.numbers
    }
    if(checkSymbols.checked){
        chars+=checkboxChars.symbols
    }

    if(chars.length > 0 && password) {
        for(let i=0; i <= currentRangeValue ; i++) {
             let randomNumber = Math.floor(Math.random()* chars.length)
             passwordGenerated += chars.substring(randomNumber, randomNumber +1);
        }
        password.innerHTML = passwordGenerated
        password.classList.remove('placeholder')
        
    }

}

const updateTxt = (e:Event):void => {
    let currentRangeValue: string = (e.target as HTMLInputElement).value;
    if (lenghtNumber) {
        lenghtNumber.innerHTML = currentRangeValue;
    }

}

const calculateSecurityLevel = (length: number, checkedCount:number): string => {

    if ( length < 8 || checkedCount === 1) {
        barsLvl?.setAttribute('class', 'too-weak')
        return 'Too Weak!';
    } else if (length < 13 && checkedCount < 3) {
        barsLvl?.setAttribute('class', 'weak')
        return 'Weak';
    } else if (length < 16 && checkedCount <= 4 ) {
        barsLvl?.setAttribute('class', 'medium')
        return 'Medium';
    } else if (length >= 16 && checkedCount > 3) {
        barsLvl?.setAttribute('class', 'strong')
        return 'Strong';
    } else {
        return '';
    }
};

const copyEvent = () => {
    navigator.clipboard.writeText(password.innerText)
        copyAlert?.classList.remove('hidden')
    setTimeout(()=> {copyAlert?.classList.add('hidden')} , 1500)
};



form?.addEventListener('submit', generatePassword)
range?.addEventListener('input', updateTxt)
copyButton?.addEventListener('click', copyEvent)

// change bg input color 

range.addEventListener('input', function() {
  const val = (parseInt(range.value) - parseInt(range.min)) / (parseInt(range.max) - parseInt(range.min));
  const bgSize = `${val * 100}% 100%`;

  range.style.setProperty('--bg-size', bgSize);
});
