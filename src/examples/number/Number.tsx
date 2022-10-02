import React from "react";

import { store } from "./store";

export const Number: React.FC = () => {
  const [number, setNumber] = React.useState(store.initialState);

  React.useEffect(() => {
    store.subscribe(setNumber);
    store.init();
  }, []);

  return (
    <>
      <button
        className="m-2 bg-sky-500 text-white font-bold text-lg hover:bg-sky-600"
        onClick={() => store.updateNumber(number + 1)}
      >
        Increase {number}
      </button>
    </>
  );
};
