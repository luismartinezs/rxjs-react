import React from "react";
import { useA11y } from "../utils/a11y";

export const Label: React.FC<{ key: string; label: string }> = ({
  key,
  label,
}) => {
  const id = useA11y().useRegisteredId(key);
  return <span id={id}>{label}</span>;
};
