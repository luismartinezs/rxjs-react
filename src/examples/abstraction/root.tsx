import React from "react";
import StateUpdater from "./StateUpdater";
import StateDisplay from "./StateDisplay";

export default function root() {
  return (
    <>
      <StateUpdater />
      <StateDisplay />
    </>
  );
}
