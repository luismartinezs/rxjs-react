import React from "react";
import { Form } from "./Form";
import { A11yProvider } from "./store";

export default function Root() {
  return (
    <A11yProvider>
      <p className="mb-2">
        You can toggle the label visibility. When a label is removed, the
        associated input, which is subscribed to changes, detects that and loses
        the association to the non-existing label. The id is displayed to see
        how it toggles between a generated id and being undefined.
      </p>
      <Form />
    </A11yProvider>
  );
}
