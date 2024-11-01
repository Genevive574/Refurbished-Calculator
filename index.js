let displayValue = '0';
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;
let expression = '';


const display = document.getElementById('display');
const expressionDisplay = document.getElementById('expressionDisplay')

function updateDisplay(){
    display.textContent = displayValue;
    expressionDisplay.textContent = expression
}

updateDisplay();

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const { value } = event.target.dataset;
        // const value = event.target.dataset.value

        handleInput(value)
        updateDisplay();
    })
})

function handleInput(value){
    if (value === 'clear'){
        clear();
        return;
    }

    else if (value === '='){
        if(operator && !waitingForSecondOperand){
            calculate();
            expression = '';
            operator = null
            return;
        }
    }

    else if(['+','-','/','*'].includes(value)){
        handleOperator(value);
        return;
    }

    else if(value === '.'){
        inputDecimal(value);
        return;
    }

    else if (value === '%'){
        calculatePercentage();
        updateDisplay();
        return
    }

    else if(value === 'sqrt'){
        calculateSquareRoot();
        updateDisplay();
        return;
    }

    else{
        inputDigit(value)
    }

    updateDisplay();
}

function clear(){
    displayValue = '0'
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null
    expression = ''
}


function inputDigit(digit){
    if(waitingForSecondOperand){
        displayValue = digit;
        waitingForSecondOperand = false;
    }
    else{
        displayValue = displayValue === '0' ? digit : displayValue + digit
    }

    expression += digit;
}

function inputDecimal(dot){
    if(!displayValue.includes(dot)){
        displayValue += dot
        expression += dot;
    }
}


function handleOperator(nextOperator){
    const inputValue = parseFloat(displayValue);

    if(firstOperand === null){
        firstOperand = inputValue
    }else if (operator) {
        const result = calculate();
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;

    expression += `${nextOperator}`
}

function calculate() {
    const secondOperand = parseFloat(displayValue);
    let result;

     switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
            break;
        default:
            result = secondOperand;
            break;
    }

    displayValue = result.toString();
    firstOperand = result;
    waitingForSecondOperand = true;
}


function calculatePercentage() {
    displayValue = (parseFloat(displayValue) / 100).toString();
}

function calculateSquareRoot() {
    const currentValue = parseFloat(displayValue);
    if (currentValue < 0) {
        displayValue = "Error";
    } else {
        displayValue = Math.sqrt(currentValue).toString();
    }
}