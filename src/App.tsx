import "./App.css";
import { Form } from "./components/Form";
import { Number } from "./components/Number";
import { ResetNumber } from "./components/ResetNumber";
import { ModalsComponent } from "./components/ModalsComponent";
import { DocumentTitle } from "./components/DocumentTitle";

function App() {
  return (
    <>
      <DocumentTitle />
      <div className="App flex flex-col space-y-4">
        <ModalsComponent />
      </div>
    </>
  );
}

export default App;
