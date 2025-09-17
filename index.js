let previousValue = "";
let currentValue = "";
let operator = "";
let noEvent = false;

const displayPrevious = document.querySelector(".display__previous");
const displayCurrent = document.querySelector(".display__current");

const functionsBnt = document.querySelectorAll(".key--function");
const operators = document.querySelectorAll(".key--operator");
const buttons  = document.querySelectorAll("[data-number]");
const decimal = document.querySelector(".key--decimal");
const equals = document.querySelector(".key--equals");
const sign = document.querySelector(".key--wide");

// Handle function buttons (AC, DEL, %, etc.)
functionsBnt.forEach(func => {
    func.addEventListener("click", () => {
       if (func.dataset.clear !== undefined) {
        displayCurrent.textContent = "0";
        displayPrevious.textContent = "";
        currentValue = "";
        previousValue = "";
        operator = "";
        noEvent = false;        
       } else if(func.dataset.delete !== undefined) {
           currentValue = currentValue.slice(0, -1);
           displayCurrent.textContent = currentValue || "0";
       } else if (func.dataset.percent !== undefined) {
        currentValue = (Number(currentValue) / 100).toString();
        displayCurrent.textContent = currentValue;
       } 
    });
});

// Handle number buttons
buttons.forEach(bnt => {
    bnt.addEventListener("click", () => {
        const value = bnt.dataset.number;

        if(noEvent) {
            currentValue = "";
            previousValue = "";
            operator = "";
            noEvent = false;
            displayCurrent.textContent = "0";
        }
        currentValue += value;
        displayCurrent.textContent = currentValue;
    });
});

// Handle operator buttons
operators.forEach(oper => {
    oper.addEventListener("click", () => {
        if(noEvent) {
            noEvent = false;
        }
        if (!currentValue && previousValue) {
            operator = oper.dataset.operation
            displayPrevious.textContent = `${previousValue} ${operator}`
            displayCurrent.textContent = "0";
            return
        }
        if (previousValue && currentValue && operator) {
            previousValue = operate(previousValue, currentValue, operator).toString();
            displayCurrent.textContent = previousValue;
        } else {
            previousValue = currentValue;
        }
        operator = oper.dataset.operation;
        currentValue = "";
        displayCurrent.textContent = "0";
        displayPrevious.textContent = `${previousValue} ${operator}`
    });
});

// Handle equals
equals.addEventListener("click", () => {
    if(!previousValue || !currentValue || !operator) return;

    let result = operate(previousValue, currentValue, operator);
    displayCurrent.textContent = result;
    displayPrevious.textContent = "";
    previousValue = result.toString();
    currentValue = "";
    operator = "";
    noEvent = true; 
});

// Math operation function
function operate(a, b, oper) {
    a = Number(a);
    b = Number(b);

    if(oper === "+") return a + b;
    if(oper === "-") return a - b;
    if(oper === "*") return a * b;
    if(oper === "/") return b === 0 ? "Error" : a / b;

    return 0;
};

// Handle decimal
decimal.addEventListener("click", () => {
    if(noEvent) {
        currentValue = "0";
        displayPrevious.textContent = "";
        noEvent = false;
    }
    if(!currentValue.includes(".")) {
        currentValue += ".";
        displayCurrent.textContent = currentValue;
    }
});

// Handle sign toggle
sign.addEventListener("click", () => {
    if(currentValue) {
        currentValue = (-Number(currentValue).toString());
        displayCurrent.textContent = currentValue;
    }
});