import React from "react";
import { Provider } from "./store";
import Emitter from "./Emitter";
import Subscriber from "./Subscriber";

export default function root() {
  return (
    <Provider>
      <div className="flex flex-col space-y-4">
        <div className="bg-zinc-100 rounded-lg px-4 py-2">
          <h2>Emitters</h2>
          <Emitter />
        </div>
        <div className="bg-zinc-100 rounded-lg p-4">
          <h2>Subscribers</h2>
          <Subscriber />
        </div>
      </div>
    </Provider>
  );
}
