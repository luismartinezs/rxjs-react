import React from "react";
import StateUpdater from "./StateUpdater";
import StateDisplay from "./StateDisplay";

export default function root() {
  return (
    <>
      <p className="mb-2">
        A generic example where two buttons change the state of a subscriber
        component. This example doesn&apos;t use a provider. Components interact
        directly with the observable to push and receive data, and thus need to
        handle all reactivity themselves.
      </p>
      <StateUpdater />
      <StateDisplay />
    </>
  );
}
