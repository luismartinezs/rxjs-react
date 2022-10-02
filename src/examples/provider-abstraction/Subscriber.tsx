import React from "react";

const mockState = {
  name: "John Doe",
  age: 42,
};

export default function Subscriber() {
  return (
    <div className="text-left">
      <pre>{JSON.stringify(mockState, null, 4)}</pre>
    </div>
  );
}
