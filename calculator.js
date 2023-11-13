const display = document.getElementById('display');
let operand1 = "";
let operand2 = "";
let operator = '';

const handleInput = (ch)=>{
    if(ch=== '-'){
        if(operand1 === "") operand1 = ch;
        else if(operand1 !== "-" && operator === "") operator = ch;
        else if(operand2 === "") operand2 = ch;
        else if(operand2 !== "" && operand2!=="-"){ Evaluate(); operator = ch; }
        else return;
    }else if(ch==='+' || ch==='*' || ch==='/'){
        if(operand1 !== "" && operand1 !== "-" && operator === '') operator = ch;
        else if(operator !== '' && operand2 === "") display.value = display.value.slice(0,-1);
        else if(operand2 !== "" && operand2!=="-"){ Evaluate(); operator = ch; }
        else return;
    }else if(ch>='0' && ch<='9'){
        if(operator !== '') operand2 += ch;
        else operand1 += ch;
    }
    else if(ch==='.'){
        if(operator === '' && !operand1.includes(".")) operand1 += ch;
        else if(operator !== '' && !operand2.includes(".")) operand2+=ch;
        else return;
    }
    display.value += ch;
}

const handleClear = ()=>{
    display.value = "";
    operand1 = ""; operand2 = ""; operator='';
}

const handleDelete = ()=>{
    if(operand2 !== "") operand2 = operand2.slice(0,-1);
    else if(operator !== '') operator = '';
    else if(operand1 !== "") operator = operand1.slice(0,-1);

    display.value = display.value.slice(0,-1);
}

const Evaluate = ()=>{
    let op1 = parseFloat(operand1);
    let op2 = parseFloat(operand2);
    let result;
    let error = false;
    switch(operator){
        case '+': result = op1 + op2; break;
        case '-': result = op1 - op2; break;
        case '*': result = op1 * op2; break;
        case '/': result = op1 / op2; break;
        default: error=true; break;
    }
    if(error){
        display.value = 'Bad Expression';
        operand1 = ""; operand2 = ""; operator = '';
    }
    operand1 = result.toString();
    operand2 = ""; operator=''; 
    display.value = operand1;
    console.log(result);
}
