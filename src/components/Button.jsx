import { RiDeleteBack2Line } from "react-icons/ri";
export default function Button({
  label,
  type,
  expression,
  currentNumber,
  setCurrentNumber,
  setExpression,
}) {
  const expElements = expression.split(" ");
  const lastElement = expElements.at(-1);
  const operators = ["+", "-", "*", "/"];

  const handleNumber = () => {
    //debugger;
    if (currentNumber == "0") {
      setCurrentNumber(`${label}`);
      return;
    }

    if(currentNumber.includes(".")){
        setCurrentNumber(`${currentNumber}${label}`);
        setExpression(`${expression}${label}`);
        return;
    }

    console.log(expElements, lastElement);
    if (expElements.length > 1) {
        if (isNaN(lastElement)) {
            // If the last element is not a number, start a new number
            console.log("new number", expression, label);
            //setCurrentNumber(`${label}`);
            // Reset expression and set current number to the new number if last element is '='
            if (lastElement == "=") {
                setCurrentNumber(`${label}`);
                setExpression("");
                return;
            }
            //return;
            setCurrentNumber(`${label}`);
            setExpression(`${expression} ${label}`);
        }
        else{
            setCurrentNumber(`${currentNumber}${label}`);
            setExpression(`${expression}${label}`);
        } 
    } else {
        // If the expression length is 1 or less, just append the label to the current number
        setCurrentNumber(`${currentNumber}${label}`);
        //setExpression(`${expression}${label}`);
    }
  };

  const handleOperator = () => {
    if (expression.length == 0 || expression.includes("=")) {
      setExpression(`${currentNumber} ${label}`);
    } else if (expression.split(" ").length > 1) {
      if (operators.includes(lastElement)) {
        console.log("operator already exists");
        setExpression(`${currentNumber} ${label}`);
      } else {
        console.log("adding operator", expression, currentNumber, label);
        setExpression(`${currentNumber} ${label}`);
      }
    } else {
      setExpression(`${expression} ${label}`);
    }
  };

  const handleEquals = () => {
    // Determine what to do when the equals button is pressed
    if (operators.includes(lastElement)) {
      //example: 1 + -> 1 + 1 =
      console.log(
        `${expElements.slice(0, 2).join(" ")} ${currentNumber} ${label}`
      );
      setExpression(
        `${expElements.slice(0, 2).join(" ")} ${currentNumber} ${label}`
      );
      return;
    }
    if (
      operators.some((op) => expression.includes(op)) &&
      expElements.includes("=")
    ) {
      // if the last element is an operator and equals already exists,
      console.log(
        `${expElements.slice(0, 3).join(" ")} ${expElements
          .slice(1, 3)
          .join(" ")} ${label}`
      );
      setExpression(
        `${expElements.slice(0, 3).join(" ")} ${expElements
          .slice(1, 3)
          .join(" ")} ${label}`
      );
      return;
    }

    setExpression(`${expression} ${label}`);
  };

  const handleDecimal = () => {
    // if there is already a decimal point, return
    if (expElements.length > 1) {
        if (isNaN(lastElement)) {
            // If the last element is not a number, start a new number
            console.log("new number with decimal", expression, label);
            //setCurrentNumber(`${label}`);
            // Reset expression and set current number to the new number if last element is '='
            if (lastElement == "=") {
                setCurrentNumber(`0.`);
                setExpression("");
                return;
            }
            //return;
            setCurrentNumber(`${label}`);
            setExpression(`${expression} ${label}`);
        }
        else{
            setCurrentNumber(`${currentNumber}${label}`);
            setExpression(`${expression}${label}`);
        } 
    } else {
        // If the expression length is 1 or less, just append the label to the current number
        setCurrentNumber(`${currentNumber}${label}`);
        //setExpression(`${expression}${label}`);
    }
    //debugger;
    setCurrentNumber(`${currentNumber}${label}`);
    setExpression(`${expression} ${currentNumber}${label}`);
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
