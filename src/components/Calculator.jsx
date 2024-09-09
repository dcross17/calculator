import { useState, useEffect } from "react";
import Display from "./Display";
import Button from "./Button";

export default function Calculator() {
    // stack is the current stack of the calculation
    // currentNumber is the number that will be calculated
    const [currentNumber, setCurrentNumber] = useState('');
    const [displayNumber, setDisplayNumber] = useState('0');
    const [calcReady, setCalcReady] = useState(false);
    const [expression, setExpression] = useState([]);
    const operators = ['+','-','*','/'];
    const numberToUse = currentNumber === '' ? displayNumber : currentNumber;
    // useEffect to calculate the expression everytime the expression changes
    useEffect(() => {
        console.log(expression.length)
        if(calcReady || expression.length > 3){
            console.log('Expression', expression);
            constructExpression();
            calculateExpression(expression);
        }
    }, [calcReady, expression]);

    const constructExpression = () => {
        // Ex. '1 + =' -> '1 + 1 ='
        let operand1 = parseFloat(expression[0]);
        let operand2 = parseFloat(expression[2]);

        if(currentNumber === '' && expression.length > 0){
            //replace first number with displayNumber
            expression[0] = numberToUse;
            setExpression([...expression]);
        }

        /*if(isNaN(operand2)){
            //Ex. '1 + ' -> '1 + 1'
            operand2 = operand1;
        }
        setExpression([operand1, operator, operand2]);*/

        checkTrailingDecimals();
    }

    const calculateExpression = (expression) => {
        
        console.log(expression, expression.length);
        
            let result = expression[0];
            let operator = expression[1];

            if(operators.includes(operator)){
                let operand1 = parseFloat(expression[0]);
                let operand2 = parseFloat(expression[2]);
                switch(operator){
                    case '+':
                        result = operand1 + operand2;
                        break;
                    case '-':
                        result = operand1 - operand2;
                        break;
                    case '*':
                        result = operand1 * operand2;
                        break;
                    case '/':
                        // TODO: handle dividing by zero
                        result = operand1 / operand2;
                        break;
                }
            }
        console.log(result);
        
        // after calculation, display the result and clear the current number for next
        // and then setCalcReady to false to prevent the useEffect from running again
        setCurrentNumber('');
        setDisplayNumber(`${result}`);
        setCalcReady(false);
    }

    const checkTrailingDecimals = () => {
        if(expression.length == 0){
            return;
        }

        if(expression.length > 1){
            // check if the first number has a trailing decimal point
            if(expression[0].at(-1) === '.'){
                expression[0] = expression[0].replace('.','');
            }
            // check if the second number has a trailing decimal point
            if(typeof expression[2] !== 'undefined'){
                if(expression[2].at(-1) === '.'){
                    expression[2] = expression[2].replace('.','');
                }
            }
        }
        setExpression([...expression]);
    }

    //use a map to preserve the order of the buttons
    const buttons = new Map([
        // Microsoft Windows Calculator Standard Layout for reference
        // left to right, top to bottom, 4 colums and 6 rows
        ['%', 'function'],
        ['CE', 'function'],
        ['C', 'function'],
        ['DEL', 'function'],
        ['1/x', 'function'],
        ['x^2', 'function'],
        ['√x', 'function'],
        ['/', 'operator'],
        ['7', 'number'],
        ['8', 'number'],
        ['9', 'number'],
        ['*', 'operator'],
        ['4', 'number'],
        ['5', 'number'],
        ['6', 'number'],
        ['-', 'operator'],
        ['1', 'number'],
        ['2', 'number'],
        ['3', 'number'],
        ['+', 'operator'],
        ['+/-', 'function'],
        ['0', 'number'],
        ['.', 'decimal'],
        ['=', 'operator']
    ]);

    return (
        <div className="max-w-sm container">
            <Display displayNumber = {displayNumber} currentNumber = {currentNumber} expression = {expression} />
            <div className = "grid grid-cols-4 gap-2">
                {Array.from(buttons.entries()).map(([key, type]) => 
                {
                    return <Button key = {key} label = {key} type = {type}  currentNumber = {currentNumber} setCurrentNumber = {setCurrentNumber} expression = {expression} setExpression = {setExpression} setCalcReady = {setCalcReady} />
                }
            )}
            </div>
        </div>
    )
}