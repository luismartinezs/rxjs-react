import React, { useState } from "react";
import { useA11y } from "../utils/a11y";
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
      <button onClick={() => setShowName(!showName)}>Toggle name</button>
      <button onClick={() => setShowEmail(!showEmail)}>Toggle email</button>
      <form onSubmit={handleSubmit}>
        {showName && <Label name="name" label="Name" />}
        <Input name="name" />
        {showEmail && <Label name="email" label="Email" />}
        <Input name="email" />
      </form>
    </div>
  );
};
