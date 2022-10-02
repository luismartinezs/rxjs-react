import React from "react";
import { Form } from "./Form";
import { A11yProvider } from "./store";

export default function Root() {
  return (
    <A11yProvider>
      <Form />
    </A11yProvider>
  );
}
