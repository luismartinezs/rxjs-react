import React from "react";
import { useA11y } from "../utils/a11y";

export const Input: React.FC<{ key: string }> = ({ key }) => {
  const labelledBy = useA11y().useLabelledOrDescribedBy(key);
  return <input type="text" aria-labelledby={labelledBy} />;
};
