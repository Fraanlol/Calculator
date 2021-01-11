function start(){
    document.querySelectorAll('.number').forEach((key) => { //Adds a click Event to all the numbers.
        key.addEventListener('click', (e) => {
            pushActual(e.target.innerText);
        });
    });
    document.querySelectorAll('.operator').forEach((key) => { //Adds click event to operators and to equal button
        key.addEventListener('click', (e) => {
            key.classList.contains('equal') ? isCalculable() : pushActual(e.target.innerText);
        });
    });
    window.addEventListener('keydown', (e) => { // Adds keyboard functionality
        e.key.match(/\b\d\b|[+*\-/%\.]/g) ? pushActual(e.key):false
        e.key.match(/(Enter)|[=]/g) ? isCalculable():false;
        e.key.match('Backspace') ? spaceEraser():false;
    });
    document.querySelector('.backButton').addEventListener('click', spaceEraser);
    document.querySelector('.clear').addEventListener('click', clearEraser);
}

let actual = [];
let total = [];
const actualDisplay = document.querySelector('.current');

function pushActual(n){ //Function to push items to both the calculator Display and the calculator Array
    if(actualDisplay.innerText.length === 21){
        return errorText.innerHTML = 'Max number length (21) reached';
    } else {
        if ( +n === +n ) {
            errorText.innerHTML = '';
            actual.push(n);
            document.querySelectorAll('.main').forEach((key) => key.removeAttribute('disabled'));
            actualDisplay.innerHTML = actual.join('');
        } else{
            if(actualDisplay.innerHTML === '0'){
                errorText.innerHTML = 'You must introduce a number first';
            } else{
                if (n === '.'){
                    actual[actual.length - 1].match(/[+*\-/%\.]/g) ? errorText.innerHTML = 'You need to put a number before a point' : actual.push(n);
                } else {
                actual[actual.length - 1].match(/[+*\-/%\.]/g) ? actual[actual.length - 1] = n : actual.push(n);
            }
            actualDisplay.innerHTML = actual.join('');
        } 
    }
}}

const errorText = document.querySelector('.errorContainer');
const totalResult = document.querySelector('.result');

function spaceEraser(){ //Function to erase 1 space on the calculator display
   actual.pop();
   actual.length === 0 ?  actualDisplay.innerHTML = 0 :  actualDisplay.innerHTML = actual.join('');
   document.querySelectorAll('.main').forEach((key) => key.removeAttribute('disabled'));
   document.querySelector('.point').removeAttribute('disabled');
}
function clearEraser(){ //Function to reset calculator, it'd be more easy to do a location.reload, but that wouldn't be clean
    actual = [];
    topush = [];
    actualDisplay.innerHTML = 0;
    totalResult.innerHTML = 0;
    document.querySelector('.point').removeAttribute('disabled');
    document.querySelectorAll('.main').forEach((key) => key.removeAttribute('disabled'));
}

function isCalculable(){ // Function to check if the calculator display contains an operation or are just numbers
    if (actual.join('').charAt(actual.length - 1).match(/[+*\-/%]/g)){
        return errorText.innerHTML = 'Operation can\'t end in operator'
    }else if (actual.join(' ').match(/[+\-/*%]/g)){
        return evaluation();
    } else {
        if(actual[actual.length - 1] === '.'){
            actual.pop();
            actualDisplay.innerHTML = actual.join('');
        }
    }
    return totalResult.innerHTML = `${actual.join('') === '' ? '0' : actual.join('')}`
}
function evaluation(){
    calcArray = actual.join(' ').replaceAll(/(\s)\.(\s)/g , '.');
    clearEraser();
    document.querySelector('.point').removeAttribute('disabled');
    while (calcArray.match(/(\d)\s+(\d)/g) !== null){
        calcArray = calcArray.replaceAll(/(\d)\s+(\d)/g ,'$1$2');
    }
    valArr = calcArray.split(/\s[+\-/*%]\s/).toString().replaceAll(/(\s)(\d)/g,'$2').split(',').map(i => Number(i)); //split string on each operator (having a space either side allowing for a negative value) and then transform string values to number values.
    opArr = calcArray.match(/\s[+\-/*%]\s/g).map(i => i.trim()); //return all operators from string, and then clear whitespace
    
  
    var currentTotal = valArr[0];
    for(var i=0,len=opArr.length;i<len;i++){
        switch(opArr[i]){
            case '+':
                currentTotal = currentTotal + valArr[i+1];
                break;
            case '-':
                currentTotal = currentTotal - valArr[i+1];
                break;
            case '*':
                currentTotal = currentTotal * valArr[i+1];
                break;
            case '/':
                currentTotal = currentTotal / valArr[i+1];
                break;
            case '%':
                currentTotal = (currentTotal * valArr[i+1]) / 100;
                break;
        };
    };
    
    if (currentTotal === Infinity) { 
        errorText.innerHTML='Can\'t divide by 0';
        actual.push('0');
    } else {
        totalResult.innerHTML = parseFloat(currentTotal);
        actual = parseFloat(currentTotal).toString().split('');
    }
    return actualDisplay.innerHTML = actual.join('');
}
start();