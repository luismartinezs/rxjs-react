import React from "react";
import { useA11y } from "../utils/a11y";

export const Input: React.FC<{ name: string }> = ({ name }) => {
  const labelledBy = useA11y().useLabelledOrDescribedBy(name);
  return <input type="text" aria-labelledby={labelledBy} />;
};
