let password = document.querySelector('.password-txt')
let form = document.querySelector('.generator-form')
let copyButton =  document.querySelector('copy-btn')
let levelText = document.querySelector('.current-lvl')
const checkBoxes = document.querySelectorAll<HTMLInputElement>('input[type=checkbox]');
let range = document.querySelector('.range') as HTMLInputElement
let lenghtNumber = document.querySelector('.lenght-number')
let barsLvl = document.querySelector('#bars')
const checkboxChars:object = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]\\:;?><,./-="
}

console.log(checkBoxes)

const generatePassword = (e:Event) => {
    e.preventDefault();
    let currentRangeValue: number = parseInt(range.value)
    if(levelText){
        levelText.innerHTML= calculateSecurityLevel(currentRangeValue, checkBoxes )
    }

}

const updateTxt = (e:Event) => {
    let currentRangeValue: string = (e.target as HTMLInputElement).value;
    if (lenghtNumber) {
        lenghtNumber.innerHTML = currentRangeValue;
    }

}

const calculateSecurityLevel = (length: number, selectedCheckboxes: NodeListOf<HTMLInputElement>): string => {
    const checkedCount = Array.from(selectedCheckboxes).filter(checkbox => checkbox.checked).length;
     console.log(length)
    console.log(checkedCount)
    if (length < 8 || checkedCount === 1) {
        barsLvl?.setAttribute('class', 'too-weak')
        return 'Too Weak!';
    } else if (length < 12 && checkedCount > 1) {
        barsLvl?.setAttribute('class', 'weak')
        return 'Weak';
    } else if (length <= 20 && checkedCount >= 2) {
        barsLvl?.setAttribute('class', 'medium')
        return 'Medium';
    } else if (length >= 16 && checkedCount >= 3) {
        barsLvl?.setAttribute('class', 'strong')
        return 'Strong';
    } else {
        return '';
    }
};


form?.addEventListener('submit', generatePassword)
range?.addEventListener('change', updateTxt)