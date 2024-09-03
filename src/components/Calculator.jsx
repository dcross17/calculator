import { useState, useEffect } from "react";
import Display from "./Display";
import Button from "./Button";

export default function Calculator() {
    // stack is the current stack of the calculation
    // currentNumber is the number that will be calculated
    const [currentNumber, setCurrentNumber] = useState('');
    const [expression, setExpression] = useState([]);

    // useEffect to calculate the expression everytime the expression changes
    useEffect(() => {
        console.log('Expression', expression);
        calculateExpression(expression);
    }, [expression]);

    const calculateExpression = (expression) => {
        /*if(expression.length == 0){
            setCurrentNumber('0');
            return;
        }*/
        // let stack = expression.split(' ');
        // stack = checkTrailingDecimals(stack);
        // console.log(stack, stack.length);
        // let operators = ['+','-','*','/', '='];
        // if(stack.length >= 4){
        //     let result = stack[0];
        //     let operator = stack[1];

        //     if(operators.includes(operator)){
        //         let operand1 = parseFloat(stack[0]);
        //         let operand2 = parseFloat(stack[2]);

        //         switch(operator){
        //             case '+':
        //                 result = operand1 + operand2;
        //                 break;
        //             case '-':
        //                 result = operand1 - operand2;
        //                 break;
        //             case '*':
        //                 result = operand1 * operand2;
        //                 break;
        //             case '/':
        //                 // TODO: handle dividing by zero
        //                 result = operand1 / operand2;
        //                 break;
        //         }
        //     }
        // console.log(result);
        // if(expression.includes('=')){
        //     setCurrentNumber(`${result}`);
        //     // this is for when the user presses equals multiple times
        //     // it will keep the result and the last operator
        //     if(stack.length >= 6){
        //         setExpression(`${result} ${stack.slice(-3).join(' ')}`);
        //     }
        // }
        // else{
        //     console.log(result, expression)
        //     setCurrentNumber(`${result}`);
        //     setExpression(`${result} ${stack.at(-1)}`);
        // }
        // }
        
    }

    const checkTrailingDecimals = (stack) => {
        if(stack.length == 0){
            return;
        }

        if(stack.length > 1){
            // check if the first number has a trailing decimal point
            if(stack[0].at(-1) === '.'){
                stack[0] = stack[0].replace('.','');
            }
            // check if the second number has a trailing decimal point
            if(typeof stack[2] !== 'undefined'){
                if(stack[2].at(-1) === '.'){
                    stack[2] = stack[2].replace('.','');
                }
            }
        }
        setExpression(stack.join(' '));
        return stack;
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
            <Display currentNumber = {currentNumber} expression = {expression} />
            <div className = "grid grid-cols-4 gap-2">
                {Array.from(buttons.entries()).map(([key, type]) => 
                {
                    return <Button key = {key} label = {key} type = {type}  currentNumber = {currentNumber} setCurrentNumber = {setCurrentNumber} expression = {expression} setExpression = {setExpression} />
                }
            )}
            </div>
        </div>
    )
}