let operator = '';
let previousValue = '';
let currentValue = '';


document.addEventListener("DOMContentLoaded", function(){
    let clear = document.querySelector(".clear");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".digit");


    let numbers = document.querySelectorAll(".number");
    let operators = document.querySelectorAll(".operator");

    let previous = document.querySelector(".row1");
    let current = document.querySelector(".row2");

    let deleteNumber = document.querySelector(".delete");
    let negative = document.querySelector(".negative-positive");

    numbers.forEach((number) => number.addEventListener("click", function(e){
        handleNumber(e.target.textContent);
        current.textContent = currentValue;
    }))

    operators.forEach((op) => op.addEventListener("click", function(e){
        if(currentValue != ''){
            handleOperator(e.target.textContent);
            previous.textContent = previousValue + " " + operator;
            current.textContent = currentValue;
        }
        
    }))

    clear.addEventListener("click", function(){
        previousValue = '';
        currentValue = '';
        operator = '';
        previous.textContent = '';
        current.textContent = '';
    })

    equal.addEventListener("click", function(){
        if(currentValue != '' && previousValue != '') {
            calculate();
            previous.textContent = '';
            current.textContent = previousValue;
        } 
    })

    decimal.addEventListener("click",function(){
        addDecimal();
    })

    deleteNumber.addEventListener("click", function(){
        deleteNum();
        current.textContent = currentValue;
    })

    negative.addEventListener("click", function(){
        if(currentValue != '') {
            handleNegative();
            current.textContent = currentValue;
        }
        
    })
})

function handleNumber(number){
    if(currentValue.length <= 5){
    currentValue += number;
    }
}

function handleOperator(op){
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

function calculate(){
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if(operator === "+"){
        previousValue += currentValue;
    } else if (operator === "-"){
        previousValue -= currentValue;
    } else if (operator === 'x') {
        previousValue *= currentValue;
    } else {
        previousValue /= currentValue;
    }

    previousValue = roundNumber(previousValue);
    
    previousValue = previousValue.toString();
    currentValue = previousValue;
    currentValue = currentValue.toString();
}

function roundNumber(num){
    return Math.round(num*1000)/1000;
}

function addDecimal(){
    if(!currentValue.includes(".")){
        currentValue += '.';
    }
}

function deleteNum(){
    currentValue = currentValue.slice(0,-1);
    return currentValue;
}

function handleNegative(){
    currentValue = Number(currentValue);
    currentValue = -1 * currentValue;
    currentValue = currentValue.toString();
}
