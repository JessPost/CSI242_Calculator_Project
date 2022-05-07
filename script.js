window.onload = function () {

    //these variables will be able to change 
    let chosenOperator = '';
    let currentValue = '';
    let historyValue = '';
    let equationTotal = '';

    const displayHistoryValue = document.querySelector('.display-history');
    const displayCurrentValue = document.querySelector('.display-current');
    const numberButton = document.querySelectorAll('.number');
    const operatorButton = document.querySelectorAll('.operator');
    const clear = document.getElementById('clear');
    const negative = document.getElementById('negative');
    const percent = document.getElementById('percent');
    const decimal = document.getElementById('.');
    const equals = document.getElementById('=');

    //clear display resets everything back to starting
    function clearDisplay() {
        displayCurrentValue.innerText = "";
        displayHistoryValue.innerText = "";
        currentValue = '';
        historyValue = '';
        chosenOperator = '';
        equationTotal = '';
    }

    //convert current value to be a negative
    function negativeValue() {
        //multi by -1 to turn into a negative number
        currentValue = displayCurrentValue.innerText * -1;
        // console.log(currentValue)
        //clear current and redisplay as negative
        displayCurrentValue.innerText = "";
        displayCurrentValue.innerText = currentValue;
    }

    //convert currentValue to a percent         
    function percentage() {
        //if first number is percent
        if (chosenOperator === '' || chosenOperator === '×' || chosenOperator === '÷') {
            //divide by 100 to turn into a percent
            currentValue = displayCurrentValue.innerText / 100;
            //clear current and redisplay as percent
            displayCurrentValue.innerText = "";
            displayCurrentValue.innerText = currentValue;
        }
        //if second number is percent
        else {
            //formula for percent
            currentValue = (displayCurrentValue.innerText / 100) * historyValue;
            //toFixed(4) to round to 4 places
            displayCurrentValue.innerText = currentValue.toFixed(4);
        }
    }

    //add decimal to value
    function decimalValue() {
        //check to see if a decimal does not exist - no duplicating
        if (!displayCurrentValue.innerText.includes('.')) {
            //add a decimal 
            displayCurrentValue.innerText += '.';
            currentValue = displayCurrentValue.innerText;
        }
    }

    //computation for chosenOperator 
    function computeValue() {
        //have to parseFloat to take in decimal
        switch (chosenOperator) {
            case '÷':
                //set equationTotal to be the equation that will be performed in each case
                equationTotal = parseFloat(historyValue) / parseFloat(currentValue);
                //if dividing by zero, reset equationTotal and display error
                if (parseFloat(currentValue) === 0) {
                    equationTotal = '';
                    equationTotal = displayCurrentValue.innerText = 'Error';
                }
                break;
            case '×':
                equationTotal = parseFloat(currentValue) * parseFloat(historyValue);
                break;
            case '−':
                equationTotal = parseFloat(historyValue) - parseFloat(currentValue);
                break;
            case '+':
                // console.log(historyValue)
                // console.log(currentValue)
                // console.log(equationTotal)
                equationTotal = parseFloat(currentValue) + parseFloat(historyValue);
                // console.log(historyValue)
                // console.log(currentValue)
                // console.log(equationTotal)
                break;
            default:
                break;
        }
    }

    //equal button to do the computation and display
    function toEqual() {
        //check to see if both displayCurrentValue and the displayHistoryValue is not empty 
        if ((displayCurrentValue.innerText !== '') && (displayHistoryValue.innerText !== '')) {
            //set the currentValue to be what the main display is
            currentValue = displayCurrentValue.innerText;
            displayHistoryValue.innerText = '';
            computeValue();
            displayHistoryValue.innerText = '';
            //display equationTotal value
            console.log(equationTotal)
            displayCurrentValue.innerText = equationTotal + '';
            //equationTotal = equationTotal * - 1;
        }
    }

    function displayValue() {
        //console.log("hi");
        // historyValue = displayCurrentValue.innerText;
        //currentValue = displayHistoryValue.innerText;
        displayHistoryValue.innerText = currentValue + chosenOperator;
        displayCurrentValue.innerText = '';
    }

    function checkOperatorExist() {
        //stop repeating operators in both displays
        if (displayCurrentValue.innerText.includes('÷') || ((displayHistoryValue.innerText.includes('÷')))) return
        if (displayCurrentValue.innerText.includes('×') || ((displayHistoryValue.innerText.includes('×')))) return
        if (displayCurrentValue.innerText.includes('−') || ((displayHistoryValue.innerText.includes('−')))) return
        if (displayCurrentValue.innerText.includes('+') || ((displayHistoryValue.innerText.includes('+')))) return
        historyValue = displayCurrentValue.innerText;
    }

    function equalPressedAgain() {
        // temp variable to hold the second value past to use to equate to solution
        let storedNumber = currentValue;
        displayHistoryValue.innerText = '';
        currentValue = '';
        currentValue = storedNumber;
        historyValue = equationTotal;
        displayHistoryValue.innerText = '';
        computeValue();
        //display equationTotal value
        displayCurrentValue.innerText = equationTotal;
    }

    //going through the array of number buttons and listening for them to be clicked and displaying
    numberButton.forEach(function (buttonInput) {
        buttonInput.addEventListener('click', function () {
            //display number of button pressed
            if (equationTotal !== '') {
                clearDisplay();
                currentValue = buttonInput.innerText;
                displayCurrentValue.append(currentValue);
            }
            else if (historyValue === '') {
                historyValue = buttonInput.innerText;
                displayCurrentValue.append(historyValue);
            }
            else {
                currentValue = buttonInput.innerText;
                displayCurrentValue.append(currentValue);
            }
        })
    })

    //going through the array of operator buttons and listening for them to be clicked and displaying
    operatorButton.forEach(function (buttonInput) {
        buttonInput.addEventListener('click', function () {
            checkOperatorExist();
            //sets chosenOperator to be the button selected
            chosenOperator = buttonInput.innerText;
            displayHistoryValue.innerText = (historyValue + chosenOperator);
            displayCurrentValue.innerText = '';
        })
    })

    clear.addEventListener('click', function () {
        clearDisplay();
    })

    equals.addEventListener('click', function () {
        if (equationTotal !== '') {
            equalPressedAgain();
        }
        else {
            toEqual();
        }

    })
    negative.addEventListener('click', function () {
        negativeValue();
    })
    percent.addEventListener('click', function () {
        percentage();
    })
    decimal.addEventListener('click', function () {
        decimalValue();
    })

    //listener for keyboard input
    document.addEventListener('keypress', keyPresses);

    document.addEventListener('keyup', function (event) {
        //clear all
        if (event.key == 'Escape' || event.key == 'Backspace') {
            clearDisplay();
            // //currentValue = displayCurrentValue.innerText;
        }
        //divide
        if (event.key == '/' && (!displayCurrentValue.innerText == '' && ((displayHistoryValue.innerText === '')))) {
            equationTotal = parseFloat(historyValue) / parseFloat(currentValue);
            chosenOperator = '÷';
            displayValue();
        }
        //multiply
        if (event.key == '*' && (!displayCurrentValue.innerText == '' && ((displayHistoryValue.innerText === '')))) {
            chosenOperator = '×';
            displayValue();
        }
        //subtract --NOT WORKING
        if (event.key == '-' && (!displayCurrentValue.innerText == '' && ((displayHistoryValue.innerText === '')))) {
            chosenOperator = '−';
            displayValue();
        }
        //add
        if (event.key == '+' && (!displayCurrentValue.innerText == '' && ((displayHistoryValue.innerText === '')))) {
            chosenOperator = '+';
            displayValue();
        }
    })

    //keyboard listeners
    function keyPresses(event) {
        event.preventDefault();
        //equal
        if (event.key === 'Enter' || event.key === '=') {

            if (equationTotal !== '') {
                equalPressedAgain();
            }
            else {
                toEqual();
            }
        }
        //percentage
        if (event.key === '%') {
            percentage();
        }
        //numbers
        if (event.key >= 0 || event.key >= 9) {
            if (equationTotal === '') {
                displayCurrentValue.append(event.key);
                currentValue = displayCurrentValue.innerText;
            }
            else {
                clearDisplay();
                displayCurrentValue.append(event.key);
                currentValue = displayCurrentValue.innerText;
            }
        }
        //decimal
        if (event.keyCode === 190 || event.key === ".") {
            decimalValue();
            currentValue = displayCurrentValue.innerText;
        }
        //prevent duplicate operator
        checkOperatorExist();
    }
}
