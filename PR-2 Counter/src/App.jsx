import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  let [count, setCount] = useState(0);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("Count"));
    if (data != null) {
      setCount(data);
    }
  }, []);

  let increment = () => {
    let newCount = count + 1;
    setCount(newCount);
    localStorage.setItem("Count", JSON.stringify(newCount));
  };

  let decrement = () => {
    if (count <= 0) {
      alert("Count is not less than 0");
      return;
    }
    let newCount = count - 1;
    setCount(newCount);
    localStorage.setItem("Count", JSON.stringify(newCount));
  };

  let Reset = () => {
    setCount(0);
    localStorage.setItem("Count", JSON.stringify(0));
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Counter</h2>
    
        <h2 className="counter">{count}</h2>
       
        <div className="button-row">
          <button className="decrement" onClick={decrement}>Decrement</button>
          <button className="increment" onClick={increment}>Increment</button>
          <button className="reset" onClick={Reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
