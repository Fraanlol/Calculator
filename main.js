function start(){
    document.querySelectorAll('.number').forEach((key) => {
        key.addEventListener('click', (e) => {
            pushActual(e.target.innerText);
        }) 
    })
    document.querySelectorAll('.operator').forEach((key) => {
        key.addEventListener('click', () => {
            key.classList.contains('percentage') ? pushActual('%'):false;
            key.classList.contains('divide') ? pushActual('/'):false;
            key.classList.contains('multiply') ? pushActual('*'):false;
            key.classList.contains('subtract') ? pushActual('-'):false;
            key.classList.contains('add') ? pushActual('+'):false;
            key.classList.contains('equal') ? evaluation():false;
        }) 
    })
}

let actual = [];
let total = [];
const actualDisplay = document.querySelector('.current');
function pushActual(n){
    if (typeof(n) === typeof(n) === true) {
        actual.push(n);
        actualDisplay.innerHTML = actual.join('');
    } else {
        if(actualDisplay.innerHTML === '0'){
            console.log('error.')
        } else{
            actual.push(n);
            topush = [];
            actualDisplay.innerHTML = actual.join('');
        }
    } 
}
const spaceBack = document.querySelector('.backButton');
spaceBack.addEventListener('click', spaceEraser);
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clearEraser);
const totalResult = document.querySelector('.result');

function spaceEraser(){
   actual.pop();
   actual.length === 0 ?  actualDisplay.innerHTML = 0 :  actualDisplay.innerHTML = actual.join('');
}
function clearEraser(){
    actual = [];
    topush = [];
    actualDisplay.innerHTML = 0;
    totalResult.innerHTML = 0;
}

function evaluation(){
    paso1 = actual.join(' ').replaceAll(/(\s)\.(\s)/g , '.');
    clearEraser()
    while (paso1.match(/(\d)\s+(\d)/g) !== null){
        paso1 = paso1.replaceAll(/(\d)\s+(\d)/g ,'$1$2')
    }
   
    valArr = paso1.split(/\s[+-/*]\s/),//split string on each operator (having a space either side allowing for a negative value)
    valArr = valArr.toString().replaceAll(/(\s)(\d)/g,'$2').split(','); // Make sure that negative numbers work
    
    opArr = paso1.match(/\s[+-/*]\s/g);//return all operators from string

    
    for(var i=0,len=valArr.length;i<len;i++){
        //convert each value to a number instead of string
        valArr[i] = valArr[i] * 1;
    }
    for(var i=0,len=opArr.length;i<len;i++){
        //cleanup whitespace from operators
        opArr[i] = opArr[i].trim();
    }

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
        }
    }
   
    return totalResult.innerHTML = `${currentTotal }`;
    
}

start();