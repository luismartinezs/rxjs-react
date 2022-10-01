import React, { useState } from "react";
import { useA11y } from "../utils/a11y";

export const Form: React.FC<{}> = () => {
  const [show, toggle] = useState(true);
  const { useRegisteredId, useLabelledOrDescribedBy } = useA11y();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <button onClick={() => toggle(!show)}>Toggle input</button>
      <form onSubmit={handleSubmit}>
        {show && <label id={useRegisteredId("name")}>Name</label>}
        <input
          type="text"
          id="name"
          aria-labelledby={useLabelledOrDescribedBy("name")}
        />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
