import React from "react";
import { Provider } from "./store";
import Emitter from "./Emitter";
import Subscriber from "./Subscriber";

const Divider = () => <div className="border-b border-zinc-500 my-4" />;

export default function root() {
  return (
    <Provider>
      <p className="mb-2">
        A generic observer store with multiple emitters and multiple
        subscribers. Submit any key and value pairs in either of the two forms,
        and see how all subscribers are updated
      </p>
      <div className="flex flex-col space-y-4">
        <div className="bg-zinc-100 rounded-lg px-4 py-2">
          <h2 className="text-2xl font-bold text-zinc-500 mb-4">Emitters</h2>
          <Emitter />
          <Divider />
          <Emitter />
        </div>
        <div className="bg-zinc-100 rounded-lg p-4">
          <h2 className="text-2xl font-bold text-zinc-500 mb-4">Subscribers</h2>
          <Subscriber />
          <Divider />
          <Subscriber />
          <Divider />
          <Subscriber />
        </div>
      </div>
    </Provider>
  );
}
