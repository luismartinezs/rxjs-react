import React from "react";

import { store } from "./store";

export default function StateDisplay() {
  const [state, setState] = React.useState(store.initialState);

  React.useEffect(() => {
    store.subscribe(setState);
    store.init();
  }, []);

  return (
    <div className="rounded-lg bg-zinc-100 p-4 flex flex-col space-y-2">
      <div>
        <span className="text-zinc-500">Name: </span>
        {state.name}
      </div>
      <div>
        <span className="text-zinc-500">Age: </span>
        {state.age}
      </div>
      <div>
        <span className="text-zinc-500">Active: </span>
        {state.active ? "Yes" : "No"}
      </div>
    </div>
  );
}
