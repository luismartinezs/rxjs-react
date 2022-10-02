import React, { useState } from "react";
import { useA11y } from "./store";
import { Input } from "./Input";
import { Label } from "./Label";

export const Form: React.FC<{}> = () => {
  const [showName, setShowName] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <button onClick={() => setShowName(!showName)} className="m-2">
        Toggle name
      </button>
      <button onClick={() => setShowEmail(!showEmail)} className="m-2">
        Toggle email
      </button>
      <form onSubmit={handleSubmit}>
        {showName && <Label name="name" label="Name" />}
        <Input name="name" />
        {showEmail && <Label name="email" label="Email" />}
        <Input name="email" />
      </form>
    </div>
  );
};
