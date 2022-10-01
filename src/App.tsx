import { useState } from "react";

import "./App.css";
import { Form } from "./components/Form";
import { Number } from "./components/Number";
import { ResetNumber } from "./components/ResetNumber";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Number />
      <Number />
      <Number />
      <ResetNumber />
      <Form />
    </div>
  );
}

export default App;
