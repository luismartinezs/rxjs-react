import React from "react";

import { store } from "./store";

export default function StateUpdater() {
  const handleUpdate = () => {
    store.updateState({ name: "Jane", age: 30, active: false });
  };

  const handleReset = () => {
    store.resetState();
  };

  return (
    <div className="m-2 flex space-x-2">
      <button
        className="bg-sky-500 hover:bg-sky-600 text-white font-bold"
        onClick={() => handleUpdate()}
      >
        Set Jane
      </button>
      <button
        className="bg-sky-500 hover:bg-sky-600 text-white font-bold"
        onClick={() => handleReset()}
      >
        Set John
      </button>
    </div>
  );
}
