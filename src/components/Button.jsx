import { RiDeleteBack2Line } from "react-icons/ri";
export default function Button({
  label,
  type,
  expression,
  currentNumber,
  setCurrentNumber,
  setExpression,
}) {

  const lastElement = expression.at(-1);
  const operators = ["+", "-", "*", "/"];

  const handleNumber = () => {

    // TODO: handle numbers being added to the expression
    // [x] : Start new number when expression is empty
    // [x] : Add number to current number
    console.log(expression.length, currentNumber);
        // if the expression is empty, start a new number
        if(currentNumber == ''){
            setCurrentNumber(label);
        }
        // else if current number is already being formed, append label to it
        else{
            console.log('here', currentNumber);
            setCurrentNumber(currentNumber + label);
        }
  };

  const handleOperator = () => {
    // TODO: handle operators being added to the expression
    // [ ] : Add operator to the expression
    // [ ] : Start new number after operator has been added

    // operators are only added if the current number is not empty
    // operators are only added if the last element of the expression is not an operator

    if(expression.length == 0){
        // if expression and current number are empty, have calculator add 0 with operator
        if (currentNumber == '') {
            setCurrentNumber('0');
            setExpression(['0', label]); 
        }
        setExpression([...expression, currentNumber, label]);
        // clear current number after adding it to the expression
        setCurrentNumber('');
    }
    else{
        // if expresison is not empty ...
        console.log('Last element', lastElement);
        if(operators.includes(lastElement) && currentNumber == ''){
            // if the last element is an operator, replace it with the new operator
            // TODO: 
            // [ ] : handle the case where the user wants to change the operator but current number already exists
            setExpression(expression.slice(0, -1).concat(label));
        }
        // if the last element is a number but expression already has an operator
        // do nothing
        /*else if (operators.some(op => expression.includes(op))) {
            console.log('operator already exists');
            return;
        }*/
        else{
            console.log('Adding operator');
            setExpression([...expression, currentNumber, label]);
        }
    }

  };

  const handleEquals = () => {
    

 };


  const handleDecimal = () => {
 
  };

  const renderLabel = (label) => {
    if (label == "DEL") {
      return (
        <div className="flex justify-center items-center w-full h-full">
          <RiDeleteBack2Line />
        </div>
      );
    } else if (label == "x^2") {
      return (
        <>
          <em>x</em>
          <sup>2</sup>
        </>
      );
    } else {
      return label;
    }
  };

  return (
    <button
      className={`bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow
            ${type == "operator" ? "bg-emerald-200 hover:bg-emerald-300" : ""}
            ${
              label == "="
                ? "bg-blue-500 text-white hover:bg-blue-700"
                : "hover:bg-gray-100"
            }
            `}
      onClick={() => {
        switch (type) {
          case "number":
            handleNumber();
            break;
          case "operator":
            if (label == "=") {
              handleEquals();
            } else {
              handleOperator();
            }
            break;
          case "decimal":
            handleDecimal();
            break;
          case "function":
            if (label == "CE") {
              setCurrentNumber("0");
            } else if (label == "C") {
              setCurrentNumber("0");
              setExpression("");
            } else if (label == "DEL") {
              if (currentNumber.length == 1) {
                setCurrentNumber("0");
              } else {
                if (expression.length > 0) {
                  setExpression("");
                }
                // slice(0, -1) removes the last character
                setCurrentNumber(currentNumber.slice(0, -1));
              }
            } else if (label == "1/x") {
              setCurrentNumber(`${1 / parseFloat(currentNumber)}`);
            } else if (label == "x^2") {
              setCurrentNumber(`${parseFloat(currentNumber) ** 2}`);
            } else if (label == "√x") {
              // TODO: imaginary numbers i.e. sqrt(-1) = i, invalid input
              setCurrentNumber(`${Math.sqrt(parseFloat(currentNumber))}`);
            } else if (label == "%") {
              setCurrentNumber(`${parseFloat(currentNumber) / 100}`);
            } else if (label == "+/-") {
              setCurrentNumber(`${parseFloat(currentNumber) * -1}`);
            }
        }
      }}
    >
      {renderLabel(label)}
    </button>
  );
}
