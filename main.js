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
    window.addEventListener('keydown', (e) => { //Adds keyboard functionality
        e.key.match(/\b\d\b|[+*\-/%\.]/g) ? pushActual(e.key):false
        e.key.match(/(Enter)|[=]/g) ? isCalculable():false;
        e.key.match('Backspace') ? spaceEraser():false;
    });
    document.querySelector('.backButton').addEventListener('click', spaceEraser);
    document.querySelector('.clear').addEventListener('click', clearEraser);
}

let actual = [0];
let total = [];
let pointPresent = false;
const actualDisplay = document.querySelector('.current');
actualDisplay.innerHTML = actual.join('');

function pushActual(n){ //Function to push items to both the calculator Display and the calculator Array
    if(actualDisplay.innerText.length === 21){
        return errorText.innerHTML = 'Max number length (21) reached';
    } else {
        if ( +n === +n ) {
            errorText.innerHTML = '';
            actual[0] === 0 ? actual[0] = n : actual.push(n);
            actualDisplay.innerHTML = actual.join('');
        } else{
            if(actualDisplay.innerHTML === ''){
                errorText.innerHTML = 'You must introduce a number first';
            } else{
                if (n === '.'){
                    if (actual[actual.length - 1].match(/[+*\-/%\.]/g)){
                        errorText.innerHTML = 'You need to put a number before a point' 
                    } else {
                        pointPresent ? true : actual.push(n)
                        pointPresent = true;
                    }
                } else {
                actual[actual.length - 1].match(/[+*\-/%\.]/g) ? actual[actual.length - 1] = n : actual.push(n);
                pointPresent = false;
            }
            actualDisplay.innerHTML = actual.join('');
        } 
    }
}}

const errorText = document.querySelector('.errorContainer');
const totalResult = document.querySelector('.result');

function spaceEraser(){ //Function to erase 1 space on the calculator display
   errorText.innerHTML = '';
   actual[actual.length - 1].match(/[+*\-/%]/g) ? pointPresent = true : false
   actual[actual.length - 1].match(/[\.]/g) ? pointPresent = false : false
   actual.find(element => element.match(/[+*/\-%]/g)) ? actual = actual.splice(0,actual.findIndex(element => element.match(/[+*/\-%]/g))):false
   actual.pop();
   totalResult.innerHTML = '0';
   actual.length === 0 ?  actual.push('0') :  false;
   actualDisplay.innerHTML = actual.join('')
}
function clearEraser(){ //Function to reset calculator, it'd be more easy to do a location.reload, but that wouldn't be clean
    errorText.innerHTML = '';
    actual = [0];
    topush = [];
    actualDisplay.innerHTML = actual.join('');
    totalResult.innerHTML = 0;
    pointPresent = false;
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
                lastitem = `${opArr[i]} ${valArr[i+1]}`
                break;
            case '-':
                currentTotal = currentTotal - valArr[i+1];
                lastitem = `${opArr[i]} ${valArr[i+1]}`
                break;
            case '*':
                currentTotal = currentTotal * valArr[i+1];
                lastitem = `${opArr[i]} ${valArr[i+1]}`
                break;
            case '/':
                currentTotal = currentTotal / valArr[i+1];
                valArr[i+1] === 0 ? true:lastitem = `${opArr[i]} ${valArr[i+1]}`
                break;
            case '%':
                currentTotal = (currentTotal * valArr[i+1]) / 100;
                lastitem = `${opArr[i]} ${valArr[i+1]}`
                break;
        }; 
    };
    
    if (currentTotal === Infinity) { 
        errorText.innerHTML='Can\'t divide by 0';
        lastitem 
    } else {
        totalResult.innerHTML = parseFloat(currentTotal);
        actual = parseFloat(currentTotal).toString().split('');
    }
    actualDisplay.innerHTML = actual.join('');
    actual.push(lastitem.split(' ')[0]);
    actual.push(lastitem.split(' ')[1]);
    return
}
start();