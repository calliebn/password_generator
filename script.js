//DOM elements
const generateEL = document.getElementById('generate');
let length = parseInt (prompt("Pick the length of your password. Must be between 8 and 128 characters."))
if (length < 8 || length > 128) {
    length = parseInt(prompt("Password must be between 8 and 128 characters"))
}
const hasLower = confirm("Would you like to include lowercase letters?")
const hasUpper = confirm("Would you like to include uppercase letters?")
const hasNumbers = confirm("Would you like to include numbers?")
const hasSymbols = confirm("Would you like to include symbols?")

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
    //1. Init pw var
    //2. Filter out unchecked types
    //3. Loop over length call generator function for each type
    //4. Add final pw to the pw var and return

    let generatePassword = '';

    const typesCount = lower + upper + number + symbol;

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter
    (item => Object.values(item)[0]
    );

    if(typesCount ===0) {
        return '';
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatePassword += randomFunc[funcName]();
        });
    }
const finalPassword = generatePassword.slice(0, length);

return finalPassword;
}


//Generator functions
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() *26) +97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) +65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) +48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[],.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Write password to the #password input
function writePassword() {
    var password = generatePassword( hasLower, hasUpper, hasNumbers, hasSymbols, length);
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
  }
  // Add event listener to generate button
  generateEL.addEventListener("click", writePassword);