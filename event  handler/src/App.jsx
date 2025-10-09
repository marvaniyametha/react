import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("0");

  
  const handleClick = (value) => {
    if (input === "0" && value !== "." && !isNaN(value)) {
      setInput(value);
    } else {
      setInput(input + value); 
    }
  };

  // Clear all
  const handleClear = () => {
    setInput("0");
  };

  //  +/-
  const handleToggleSign = () => {
    if (input.startsWith("-")) {
      setInput(input.substring(1));
    } else {
      setInput("-" + input);
    }
  };

  // %
  const handlePercentage = () => {
    try {
      setInput((parseFloat(input) / 100).toString());
    } catch {
      setInput("Error");
    }
  };


  // =
  const handleEqual = () => {
    try {
      let expression = input.replace(/×/g, "*").replace(/÷/g, "/");
      let result = eval(expression);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="calculator">
      <div className="display">{input}</div>
      <div className="buttons">
        <button className="light-gray" onClick={handleClear}>AC</button>
        <button className="light-gray" onClick={handleToggleSign}>+/-</button>
        <button className="light-gray" onClick={handlePercentage}>%</button>
        <button className="orange" onClick={() => handleClick("÷")}>÷</button>

        <button className="dark-gray" onClick={() => handleClick("7")}>7</button>
        <button className="dark-gray" onClick={() => handleClick("8")}>8</button>
        <button className="dark-gray" onClick={() => handleClick("9")}>9</button>
        <button className="orange" onClick={() => handleClick("×")}>×</button>

        <button className="dark-gray" onClick={() => handleClick("4")}>4</button>
        <button className="dark-gray" onClick={() => handleClick("5")}>5</button>
        <button className="dark-gray" onClick={() => handleClick("6")}>6</button>
        <button className="orange" onClick={() => handleClick("-")}>-</button>

        <button className="dark-gray" onClick={() => handleClick("1")}>1</button>
        <button className="dark-gray" onClick={() => handleClick("2")}>2</button>
        <button className="dark-gray" onClick={() => handleClick("3")}>3</button>
        <button className="orange" onClick={() => handleClick("+")}>+</button>

        <button className="dark-gray zero" onClick={() => handleClick("0")}>0</button>
        <button className="dark-gray" onClick={() => handleClick(".")}>.</button>
        <button className="orange" onClick={handleEqual}>=</button>
      </div>
    </div>
  );
}

export default App;
