import React from "react";
import { Number } from "./Number";

export default function root() {
  return (
    <>
      <p className="mb-2">
        A basic example where multiple components can update the same state and
        react to it
      </p>
      <Number />
      <Number />
      <Number />
    </>
  );
}
