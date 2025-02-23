// my Selectors
const operationDisplay = document.querySelector('.lower');
const resultDisplay = document.querySelector('.upper');
const numbers = Array.from(document.getElementsByClassName('number'));
const clearEntry = document.querySelector('.clearEntry');
const clearAll = document.querySelector('.clearAll');
const equals = document.querySelector('.equals');
const operations = Array.from(document.querySelectorAll('.op'));
const point = document.querySelector('.point');
let errorOnScreen = false;

// States the input can be in regex
const regex1 = /^\-?[0-9]+(\.[0-9]+)?$/
const regex2 = /^\-?[0-9]+(\.[0-9]+)?[\-+x/%]$/
const regex3 = /^\-?[0-9]+(\.[0-9]+)?[\-+x/%]\-?[0-9]+(\.[0-9]+)?$/

// operations
const opFunctions = {
    '+': (a, b) => (a*10+b*10)/10,
    '-': (a, b) => a-b,
    'x': (a, b) => a*b,
    '%': (a, b) => a%b,
    '/': (a, b) => a/b
}


numbers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if (errorOnScreen) {
            operationDisplay.textContent = '';
            resultDisplay.textContent = '';
            errorOnScreen = false;
        }
        operationDisplay.textContent += e.target.value;
    });
});
operations.forEach((op) => {
    op.addEventListener('click', (e) => {
        if (errorOnScreen){
            operationDisplay.textContent = '';
            resultDisplay.textContent = '';
            errorOnScreen = false;
        }
        if ((operationDisplay.textContent === "" && e.target.value === "-") || regex1.test(operationDisplay.textContent))
            operationDisplay.textContent += e.target.value;
        else if (regex2.test(operationDisplay.textContent) && operationDisplay.textContent.at(-1) === "+" && e.target.value === "-")
        {
            operationDisplay.textContent = operationDisplay.textContent.substring(0, operationDisplay.textContent.length - 1);
            operationDisplay.textContent += e.target.value;
        }
        else if(regex2.test(operationDisplay.textContent) && e.target.value === '-') {
            operationDisplay.textContent += e.target.value;
        }
        else if(regex3.test(operationDisplay.textContent)) {
            resultDisplay.textContent = operationDisplay.textContent;
            result = getResult(operationDisplay.textContent);
            if (result === Infinity){
                errorOnScreen = true;
                operationDisplay.textContent = 'Bruuh???'
            }
            else
                operationDisplay.textContent = getResult(operationDisplay.textContent) + e.target.value;
        }
    });
});

point.addEventListener('click', (e) => {
    if(operationDisplay.textContent === '' || regex2.test(operationDisplay.textContent) ){
        operationDisplay.textContent += '0.';
    }
    if(/^[0-9]+$/.test(operationDisplay.textContent) || /^[0-9]+(\.[0-9]+)?[\-x+/]+[0-9]$/.test(operationDisplay.textContent)) {
        operationDisplay.textContent += '.';
    }
})

equals.addEventListener('click', () => {
    if (errorOnScreen) {
        operationDisplay.textContent = '';
        resultDisplay.textContent = ''
    }
    else if (regex3.test(operationDisplay.textContent)){
        result = getResult(operationDisplay.textContent);
        if (result === Infinity){
            errorOnScreen = true;
            operationDisplay.textContent = 'Bruuh???'
        }
        else
            operationDisplay.textContent = result;
    }
});

function getResult(operation) {

    const re = /(\-?[0-9]+(\.[0-9]+)?)([\-\+x/])(\-?[0-9]+(\.[0-9]+)?)/g;
    let parts = Array.from(operation.matchAll(re))[0];
    let result = opFunctions[parts[3]](+parts[1], +parts[4]);
    resultDisplay.textContent = operation;
    return result;
}

clearEntry.addEventListener('click', () => {
    operationDisplay.textContent = operationDisplay.textContent.substring(0, operationDisplay.textContent.length - 1);
});
clearAll.addEventListener('click', () => {
    operationDisplay.textContent = '';
    resultDisplay.textContent = '';
});