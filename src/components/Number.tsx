import React from "react";

import { store } from "../store/number";

export const Number: React.FC = () => {
  const [number, setNumber] = React.useState(store.initialState);

  React.useEffect(() => {
    store.subscribe(setNumber);
    store.init();
  }, []);

  return (
    <>
      <div>{number}</div>
      <button onClick={() => store.updateNumber(number + 1)}>Increase</button>
    </>
  );
};
