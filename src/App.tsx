import "./App.css";
import { ModalsComponent } from "./components/ModalsComponent";
import { Chat } from "./examples/chat/components/Chat";
import { DocumentTitle } from "./components/DocumentTitle";
import { useState } from "react";

function App() {
  const [showModals, setShowModals] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const hideAll = () => {
    setShowModals(false);
    setShowChat(false);
  };

  const navList = [
    {
      label: "Modals",
      onClick: () => {
        setShowModals(true);
      },
    },
    {
      label: "Chat",
      onClick: () => {
        setShowChat(false);
      },
    },
  ];

  return (
    <>
      <DocumentTitle title="App title" />
      <nav>
        <ul className="flex space-x-2 items-center justify-center">
          {navList.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  hideAll();
                  item.onClick();
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="App flex flex-col space-y-4">
        {showChat && <Chat />}
        {showModals && <ModalsComponent />}
      </div>
    </>
  );
}

export default App;
