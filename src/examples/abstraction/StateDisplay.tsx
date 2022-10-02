import React from "react";

import { store } from "./store";

export default function StateDisplay() {
  const [state, setState] = React.useState(store.initialState);

  React.useEffect(() => {
    store.subscribe(setState);
    store.init();
  }, []);

  const stateList = [
    { key: "name", value: state.name },
    { key: "age", value: state.age },
    { key: "active", value: state.active ? "Yes" : "No" },
  ];

  return (
    <div className="rounded-lg bg-zinc-100 p-4 flex flex-col space-y-2">
      {stateList.map(({ key, value }) => (
        <div key={key} className="flex space-x-2">
          <span className="font-bold">{key}:</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
}
