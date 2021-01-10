function start(){
    document.querySelectorAll('.number').forEach((key) => {
        key.addEventListener('click', (e) => {
            pushActual(e.target.innerText);
        }) 
    })
    document.querySelectorAll('.operator').forEach((key) => {
        key.addEventListener('click', (e) => {
            key.classList.contains('equal') ? test() : pushActual(e.target.innerText);
        }) 
    })
}

let actual = [];
let total = [];
const actualDisplay = document.querySelector('.current');
function pushActual(n){
    if(actualDisplay.innerText.length === 21){
        return console.log('maxNumberReached')
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
                   actual.push(n);
                    document.querySelector('.point').setAttribute('disabled','');
                } else {
                actual.push(n)
                document.querySelectorAll('.main').forEach((key) => key.setAttribute('disabled',''));
                document.querySelector('.point').removeAttribute('disabled');
            }
            actualDisplay.innerHTML = actual.join('');
        } 
    }
}}
const errorText = document.querySelector('.errorContainer');
const spaceBack = document.querySelector('.backButton');
spaceBack.addEventListener('click', spaceEraser);
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clearEraser);
const totalResult = document.querySelector('.result');

function spaceEraser(){
   actual.pop();
   actual.length === 0 ?  actualDisplay.innerHTML = 0 :  actualDisplay.innerHTML = actual.join('');
   document.querySelectorAll('.main').forEach((key) => key.removeAttribute('disabled'));
   document.querySelector('.point').removeAttribute('disabled');
}
function clearEraser(){
    actual = [];
    topush = [];
    actualDisplay.innerHTML = 0;
    totalResult.innerHTML = 0;
    document.querySelector('.point').removeAttribute('disabled');
    document.querySelectorAll('.main').forEach((key) => key.removeAttribute('disabled'));
}
function test(){
    if (actual.join(' ').match(/[+\-/*]/g)){
        return evaluation();
    } else {
        return totalResult.innerHTML = `${actual.join('') === '' ? '0' : actual.join('')}`
    }
}
function evaluation(){
    paso1 = actual.join(' ').replaceAll(/(\s)\.(\s)/g , '.');
    clearEraser();
    document.querySelector('.point').removeAttribute('disabled');
    while (paso1.match(/(\d)\s+(\d)/g) !== null){
        paso1 = paso1.replaceAll(/(\d)\s+(\d)/g ,'$1$2')
    }
   
    valArr = paso1.split(/\s[+-/*]\s/).toString().replaceAll(/(\s)(\d)/g,'$2').split(',');//split string on each operator (having a space either side allowing for a negative value)
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
   
    currentTotal === Infinity ? errorText.innerHTML='Can\'t divide by 0' : totalResult.innerHTML = parseFloat(currentTotal);
    actual = parseFloat(currentTotal).toString().split('');
    return actualDisplay.innerHTML = actual.join('');
}

start();