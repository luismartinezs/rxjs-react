import React from "react";
import { store } from "../store/number";

export const ResetNumber: React.FC = () => {
  return (
    <div>
      <button onClick={store.resetNumber}>Reset number</button>
    </div>
  );
};
