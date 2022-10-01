import { useState } from "react";

import "./App.css";
import { Form } from "./components/Form";
import { Number } from "./components/Number";
import { ResetNumber } from "./components/ResetNumber";
import { Modals } from "./components/Modals";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App flex flex-col space-y-4">
      <div>
        <Number />
        <Number />
        <Number />
        <ResetNumber />
      </div>
      <div>
        <Form />
      </div>
      <div>
        <Modals />
      </div>
    </div>
  );
}

export default App;
