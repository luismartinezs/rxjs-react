import "./App.css";
import { ModalsComponent } from "./components/ModalsComponent";
import { DocumentTitle } from "./components/DocumentTitle";

function App() {
  return (
    <>
      <DocumentTitle title="App title" />
      <div className="App flex flex-col space-y-4">
        <ModalsComponent />
      </div>
    </>
  );
}

export default App;
